define(['text!./demoWarningBar.component.html', 'text!./demoWarningBar.component.css', 'knockout'], function(componentTemplate, componentCss, ko) {
    return {
        viewModel: function(params) {
            var self = this;

            self.warningMessage = ko.observable();

            if (params) {
                this.warningMessage(ko.unwrap(params.warningMessage) || '');
            }
        },
        template: componentTemplate
    };
});