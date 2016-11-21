define([
    'knockout',
    'app/components/breadcrumbBar/breadcrumbBar.component',
], function (ko, breadcrumbBarComponent) {
    function MyProfilePageModule() {
        var self = this;

        ko.components.register("breadcrumb", breadcrumbBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.myProfile;

                appModel.breadcrumbBar = {
                    homePageInfo: appModel.pages.home,
                    currentPageInfo: appModel.currentPage
                }
            }
        };
    };

    return new MyProfilePageModule();
});


