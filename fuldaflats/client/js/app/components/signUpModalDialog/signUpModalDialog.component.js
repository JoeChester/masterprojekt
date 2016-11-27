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
            self.gender = ko.observable();
            self.termsOfUseAgreement = ko.observable(false);

            self.modalDialogContainer = ko.observable();

            function focusInput() {
                self.modalDialogContainer().find("[autofocus]:first").focus();
            }

            self.signUp = function () {

            };

            self.resetDialog = function () {
                self.firstName("");
                self.lastName("");
                self.eMail("");
                self.password("");
                self.confirmPassword("");
                self.gender("");
                self.termsOfUseAgreement(false);
            };

            self.initialize = function (params, dialogContainer) {
                if (dialogContainer) {
                    dialogContainer.on('shown.bs.modal', focusInput);
                    dialogContainer.on('show.bs.modal', self.resetDialog);
                    dialogContainer.on('hidden.bs.modal', self.resetDialog);
                    self.modalDialogContainer(dialogContainer);
                }

                if (params.currentUser && ko.isObservable(params.currentUser)) {
                    self.currentUser = params.currentUser;
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