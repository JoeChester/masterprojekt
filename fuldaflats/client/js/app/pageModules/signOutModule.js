define([
    'knockout',
    'app/components/breadcrumbBar/breadcrumbBar.component',
    'app/components/signOutBar/signOutBar.component'
], function (ko, breadcrumbBarComponent, signOutBarComponent) {
    function SignOutPageModule() {
        var self = this;

        ko.components.register("breadcrumb", breadcrumbBarComponent);
        ko.components.register("sign-out", signOutBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.signOut;

                appModel.breadcrumbBar = {
                    homePageInfo: appModel.pages.home,
                    currentPageInfo: appModel.currentPage
                }
            }
        };
    };

    return new SignOutPageModule();
});


