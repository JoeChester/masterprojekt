define(['text!./demoWarningBar.component.html', 'css!./demoWarningBar.component.css', 'knockout'],
    function(componentTemplate, componentCss, ko) {
        function DemoWarningModel() {
            var self = this;

            self.warningMessage = ko.observable();

            self.initialize = function(demoWarningMessage) {
                if (demoWarningMessage) {
                    self.warningMessage(ko.unwrap(demoWarningMessage) || '');
                }
            }
        }

        return {
            viewModel: {
                createViewModel: function(demoWarningMessage, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var demoWarning = new DemoWarningModel(ko);
                    demoWarning.initialize(demoWarningMessage);
                    return demoWarning;
                }
            },
            template: componentTemplate
        };
    });