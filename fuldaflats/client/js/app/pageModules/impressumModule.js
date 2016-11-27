define([
    'knockout',
    'app/components/breadcrumbBar/breadcrumbBar.component',
    'app/components/impressumBar/impressumBar.component'
], function (ko, breadcrumbBarComponent, impressumBarComponent) {
    function ImpressumPageModule() {
        var self = this;

        ko.components.register("breadcrumb", breadcrumbBarComponent);
        ko.components.register("impressum", impressumBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.impressum;

                appModel.breadcrumbBar = {
                    homePageInfo: appModel.pages.home,
                    currentPageInfo: appModel.currentPage
                }
            }
        };
    };

    return new ImpressumPageModule();
});


