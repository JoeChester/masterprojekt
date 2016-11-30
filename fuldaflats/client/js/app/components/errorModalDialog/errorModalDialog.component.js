define(['text!./errorModalDialog.component.html', 'css!./errorModalDialog.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function ErrorModel($, ko) {
            var self = this;

            self.showErrors = function(errors){
                
            }

            self.initialize = function(params, dialogContainer) {
            };
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    return new ErrorModel($, ko);
                }
            },
            template: componentTemplate
        };
    });