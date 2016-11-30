define(['text!./errorModalDialog.component.html', 'css!./errorModalDialog.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function ErrorModel($, ko) {
            var self = this;

            self.errors = ko.observableArray([]);

            self.showErrors = function(_errors){
                self.errors.removeAll();
                for(var i in _errors){
                    for(var k in _errors[i]){
                        self.errors.push(_errors[i][k]);
                    }
                }
                $('#errorModalDialog').modal();    
            }

            errorCallback = self.showErrors;

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