define([
    'knockout',
    'app/components/breadcrumbBar/breadcrumbBar.component',
], function(ko, breadcrumbBarComponent) {
    function BecomeLandlordPageModule() {
        var self = this;

        ko.components.register("breadcrumb", breadcrumbBarComponent);

        self.initialize = function(appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.becomeLandlord;

                appModel.breadcrumbBar = {
                    homePageInfo: appModel.pages.home,
                    currentPageInfo: appModel.currentPage
                }
            }
        };
    };

    return new BecomeLandlordPageModule();
});


