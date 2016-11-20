define(['text!./breadcrumbBar.component.html', 'knockout'], function (componentTemplate, ko) {
    return {
        viewModel: function (params) {
            var self = this;

            self.homePageInfo = ko.observable()
            self.currentPageInfo = ko.observable();

            if (params) {
                self.homePageInfo(ko.unwrap(params.homePageInfo) || '/');
                self.currentPageInfo(ko.unwrap(params.currentPageInfo) || '');
            }
        },
        template: componentTemplate
    };
});