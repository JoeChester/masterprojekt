define([
    'knockout',
    'app/components/breadcrumbBar/breadcrumbBar.component',
    'app/components/offerDetailsBar/offerDetailsBar.component'
], function (ko, breadcrumbBarComponent, offerDetailsBarComponent) {
    function OfferDetailsPageModule() {
        var self = this;

        ko.components.register("breadcrumb", breadcrumbBarComponent);
        ko.components.register("offer-details", offerDetailsBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.offerDetails;

                appModel.breadcrumbBar = {
                    homePageInfo: appModel.pages.home,
                    currentPageInfo: appModel.currentPage
                }
            }
        };
    };

    return new OfferDetailsPageModule();
});


