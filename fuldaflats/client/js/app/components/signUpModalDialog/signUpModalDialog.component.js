define(['text!./signUpModalDialog.component.html', 'css!./signUpModalDialog.component.css', 'knockout', 'jquery', 'fuldaflatsApiClient'],
    function (componentTemplate, componentCss, ko, $, api) {
        function SignUpModel($, ko, api) {
            var self = this;
            // your model functions and variables

            self.firstName = ko.observable();
            self.lastName = ko.observable();
            self.eMail = ko.observable();
            self.password = ko.observable();
            self.confirmPassword = ko.observable();
            self.genders = ko.observableArray(["Female", "Male"]);
            self.selectedGender = ko.observable();
            self.termsOfUseAgreement = ko.observable(false);

            self.domain = ko.observable("FuldaFlats.de");
            self.termsOfUsePageInfo = ko.observable({});

            self.modalDialogContainer = ko.observable();

            function focusInput() {
                self.modalDialogContainer().find("[autofocus]:first").focus();
            }

            self.signUp = function () {
                if (self.fromIsValid()) {
                    var signUpData = {
                        firstName: self.firstName,
                        lastName: self.lastName,
                        email: self.eMail,
                        password: self.password,
                        gender: self.selectedGender,
                        type: 1
                    }

                    api.users.signUp(signUpData).then(
                        function (userResult) {
                            var userObject = ko.unwrap(userResult);
                            if (userObject) {
                                self.currentUser(userObject);
                                if (self.modalDialogContainer()) {
                                    self.modalDialogContainer().modal("hide");
                                }
                            } else {
                                // todo: unknown error
                            }
                        },
                        function (rejectMessage) {
                            //todo: show error;
                        });
                }
            };

            self.fromIsValid = ko.computed(function () {
                var isValid = false;

                if (self.firstName() && self.lastName() && self.eMail() && self.password() && self.confirmPassword() && self.password() === self.confirmPassword() && self.selectedGender() && self.termsOfUseAgreement()) {
                    isValid = true;
                }

                return isValid;
            });

            self.resetDialog = function () {
                self.firstName("");
                self.lastName("");
                self.eMail("");
                self.password("");
                self.confirmPassword("");
                self.selectedGender("");
                self.termsOfUseAgreement(false);
            };

            self.optionsAfterRender = function (option, item) {
                ko.applyBindingsToNode(option, {
                    disable: !item
                }, item);
            };

            self.initialize = function (params, dialogContainer) {
                if (dialogContainer) {
                    dialogContainer.on('shown.bs.modal', focusInput);
                    dialogContainer.on('show.bs.modal', self.resetDialog);
                    dialogContainer.on('hidden.bs.modal', self.resetDialog);
                    self.modalDialogContainer(dialogContainer);
                }

                if (params) {
                    self.domain(ko.unwrap(params.domain) || 'FuldaFlats.de');
                    self.termsOfUsePageInfo(ko.unwrap(params.termsOfUsePageInfo) || {});

                    if (params.currentUser && ko.isObservable(params.currentUser)) {
                        self.currentUser = params.currentUser;
                    }
                }
            };
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var viewModel = null;

                    var templateRoot = $(componentInfo.element);
                    if (templateRoot.length > 0) {
                        var signUpDialog = templateRoot.find("#signUpModalDialog");
                        if (signUpDialog.length > 0) {
                            viewModel = new SignUpModel($, ko, api);
                            viewModel.initialize(params, signUpDialog);
                        }
                    }

                    return viewModel;
                }
            },
            template: componentTemplate
        };
    });