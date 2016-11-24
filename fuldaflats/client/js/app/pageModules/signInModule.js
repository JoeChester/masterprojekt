define([
    'knockout',
    'app/components/breadcrumbBar/breadcrumbBar.component',
    'app/components/signInBar/signInBar.component',
], function (ko, breadcrumbBarComponent, signInBarComponent) {
    function SignInPageModule() {
        var self = this;

        ko.components.register("breadcrumb", breadcrumbBarComponent);
        ko.components.register("sign-in", signInBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.signIn;

                appModel.breadcrumbBar = {
                    homePageInfo: appModel.pages.home,
                    currentPageInfo: appModel.currentPage
                }
            }
        };
    };

    return new SignInPageModule();
});


