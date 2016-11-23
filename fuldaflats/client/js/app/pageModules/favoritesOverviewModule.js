define([
    'knockout',
    'app/components/breadcrumbBar/breadcrumbBar.component',
], function (ko, breadcrumbBarComponent) {
    function FavoritesOverviewPageModule() {
        var self = this;

        ko.components.register("breadcrumb", breadcrumbBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.favoritesOverview;

                appModel.breadcrumbBar = {
                    homePageInfo: appModel.pages.home,
                    currentPageInfo: appModel.currentPage
                }
            }
        };
    };

    return new FavoritesOverviewPageModule();
});


