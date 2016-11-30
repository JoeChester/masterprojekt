define(['text!./signInModalDialog.component.html', 'css!./signInModalDialog.component.css', 'knockout', 'jquery', 'fuldaflatsApiClient'],
    function (componentTemplate, componentCss, ko, $, api) {
        function SignInModel($, ko, api) {
            var self = this;

            self.currentUser = ko.observable();
            self.eMail = ko.observable();
            self.password = ko.observable();
            self.rememberMe = ko.observable(false); // todo: remember function
            self.modalDialogContainer = ko.observable();

            self.internalError = ko.observable(false);
            self.invalidCredentials = ko.observable(false);

            function focusInput() {
                self.modalDialogContainer().find("[autofocus]:first").focus();
            }

            function resetErrors() {
                self.internalError(false);
                self.invalidCredentials(false);
            }

            self.signIn = function (mode, event) {
                if (self.eMail() && self.password()) {
                    resetErrors();

                    api.users.signIn(self.eMail(), self.password()).then(
                        function (userResult) {
                            var userObject = ko.unwrap(userResult);
                            if (userObject) {
                                self.currentUser(userObject);
                                if (self.modalDialogContainer()) {
                                    self.modalDialogContainer().modal("hide");
                                }
                            } else {
                                self.internalError(true);
                            }
                        },
                        function (xhr) {
                            if (xhr.status === 403 || xhr.status === 400) {
                                self.invalidCredentials(true);
                                errorCallback({credentials: ['Invalid email or password.']});
                            } else {
                                self.internalError(true);
                            }
                        });
                }
            };

            self.resetDialog = function () {
                self.eMail("");
                self.password("");
                self.rememberMe(false);
                resetErrors();
            };

            self.initialize = function (params, dialogContainer) {
                if (dialogContainer) {
                    dialogContainer.on('shown.bs.modal', focusInput);
                    dialogContainer.on('show.bs.modal', self.resetDialog)
                    dialogContainer.on('hidden.bs.modal', self.resetDialog)
                    self.modalDialogContainer(dialogContainer);
                }

                if (params) {
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
                        var signInDialog = templateRoot.find("#signInModalDialog");
                        if (signInDialog.length > 0) {
                            var signIn = new SignInModel($, ko, api);
                            signIn.initialize(params, signInDialog);
                        }
                    }

                    return signIn;
                }
            },
            template: componentTemplate
        };
    });