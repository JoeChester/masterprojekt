define(['text!./copyrightBar.component.html', 'knockout'], function (componentTemplate, ko) {
    function CopyrightModel(params) {
        var self = this;

        self.impressumPageInfo = ko.observable();
        self.termsOfUsePageInfo = ko.observable();
        self.copyrightDate = ko.observable();
        self.copyrightName = ko.observable();
        self.templateAuthorName = ko.observable();
        self.templateUrl = ko.observable();

        self.initialize = function (params) {
            if (params) {
                self.impressumPageInfo(ko.unwrap(params.impressumPageInfo) || '');
                self.termsOfUsePageInfo(ko.unwrap(params.termsOfUsePageInfo) || '');
                self.copyrightDate(ko.unwrap(params.copyrightDate) || '');
                self.copyrightName(ko.unwrap(params.copyrightName) || '');
                self.templateAuthorName(ko.unwrap(params.templateAuthorName) || '');
                self.templateUrl(ko.unwrap(params.templateUrl) || '');
            }
        };
    }

    return {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                // componentInfo contains for example the root element from the component template
                var copyright = new CopyrightModel(ko);
                copyright.initialize(params);
                return copyright;
            }
        },
        template: componentTemplate
    };
});