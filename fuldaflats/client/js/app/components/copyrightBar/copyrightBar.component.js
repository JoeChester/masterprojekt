define(['text!./copyrightBar.component.html', 'knockout'], function(componentTemplate, ko) {
    return {
        viewModel: function(params) {
            var self = this;

            self.impressumPageInfo = ko.observable();
            self.contactPageInfo = ko.observable();
            self.termsOfUsePageInfo = ko.observable();
            self.copyrightDate = ko.observable();
            self.copyrightName = ko.observable();
            self.templateAuthorName = ko.observable();
            self.templateUrl = ko.observable();

            if (params) {
                self.impressumPageInfo(ko.unwrap(params.impressumPageInfo) || '');
                self.contactPageInfo(ko.unwrap(params.contactPageInfo) || '');
                self.termsOfUsePageInfo(ko.unwrap(params.termsOfUsePageInfo) || '');
                self.copyrightDate(ko.unwrap(params.copyrightDate) || '');
                self.copyrightName(ko.unwrap(params.copyrightName) || '');
                self.templateAuthorName(ko.unwrap(params.templateAuthorName) || '');
                self.templateUrl(ko.unwrap(params.templateUrl) || '');
            }
        },
        template: componentTemplate
    };
}); 