define([
    'knockout',
    'app/components/breadcrumbBar/breadcrumbBar.component',
], function (ko, breadcrumbBarComponent) {
    function EditOfferPageModule() {
        var self = this;

        ko.components.register("breadcrumb", breadcrumbBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.editOffer;

                appModel.breadcrumbBar = {
                    homePageInfo: appModel.pages.home,
                    currentPageInfo: appModel.currentPage
                }
            }
        };
    };

    return new EditOfferPageModule();
});


