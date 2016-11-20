define(['text!./copyrightBar.component.html', 'knockout'], function(componentTemplate, ko) {
    return {
        viewModel: function(params) {
            var self = this;

            self.impressumUrl = ko.observable();
            self.contactUrl = ko.observable();
            self.termsOfUseUrl = ko.observable();
            self.copyrightDate = ko.observable();
            self.copyrightName = ko.observable();
            self.templateAuthorName = ko.observable();
            self.templateUrl = ko.observable();

            if (params) {
                self.impressumUrl(ko.unwrap(params.impressumUrl) || '');
                self.contactUrl(ko.unwrap(params.contactUrl) || '');
                self.termsOfUseUrl(ko.unwrap(params.termsOfUseUrl) || '');
                self.copyrightDate(ko.unwrap(params.copyrightDate) || '');
                self.copyrightName(ko.unwrap(params.copyrightName) || '');
                self.templateAuthorName(ko.unwrap(params.templateAuthorName) || '');
                self.templateUrl(ko.unwrap(params.templateUrl) || '');
            }
        },
        template: componentTemplate
    };
}); 