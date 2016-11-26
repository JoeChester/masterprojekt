define(['text!./signInModalDialog.component.html', 'css!./signInModalDialog.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        function SignInModel($, ko) {
            var self = this;

            self.username = ko.observable();
            self.password = ko.observable();
            self.rememberMe = ko.observable(false);

            self.signIn = function () {

            }

            self.initialize = function (params) {
            };
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var signIn = new SignInModel($, ko);
                    signIn.initialize(params);
                    return signIn;
                }
            },
            template: componentTemplate
        };
    });