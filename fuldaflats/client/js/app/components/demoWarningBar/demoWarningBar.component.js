define(['text!./demoWarningBar.component.html', 'css!./demoWarningBar.component.css', 'knockout'],
    function(componentTemplate, componentCss, ko) {
        function DemoWarningModel(demoWarningMessage) {
            var self = this;

            self.warningMessage = ko.observable();

            if (demoWarningMessage) {
                self.warningMessage(ko.unwrap(demoWarningMessage) || '');
            }
        }

        return {
            viewModel: {
                createViewModel: function(demoWarningMessage, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new DemoWarningModel(demoWarningMessage);
                }
            },
            template: componentTemplate
        };
    });