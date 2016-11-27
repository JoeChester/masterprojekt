define(['text!./breadcrumbBar.component.html', 'knockout'], function (componentTemplate, ko) {
    function BreadcrumbModel(params) {
        var self = this;

        self.homePageInfo = ko.observable()
        self.currentPageInfo = ko.observable();

        if (params) {
            self.homePageInfo(ko.unwrap(params.homePageInfo) || '/');
            self.currentPageInfo(ko.unwrap(params.currentPageInfo) || '');
        }
    }

    return {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                // componentInfo contains for example the root element from the component template
                return new BreadcrumbModel(params);
            }
        },
        template: componentTemplate
    };
});