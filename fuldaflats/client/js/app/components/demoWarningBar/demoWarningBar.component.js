define(['text!./demoWarningBar.component.html', 'text!./demoWarningBar.component.css', 'knockout'],
    function(componentTemplate, componentCss, ko) {
        function DemoWarningModel(params) {
            var self = this;

            self.warningMessage = ko.observable();

            if (params) {
                self.warningMessage(ko.unwrap(params.warningMessage) || '');
            }
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new DemoWarningModel(params);
                }
            },
            template: componentTemplate
        };
    });