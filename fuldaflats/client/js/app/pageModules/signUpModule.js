define([
    'knockout',
    'app/components/breadcrumbBar/breadcrumbBar.component',
    'app/components/signUpBar/signUpBar.component'
], function (ko, breadcrumbBarComponent, signUpBarComponent) {
    function SignUpPageModule() {
        var self = this;

        ko.components.register("breadcrumb", breadcrumbBarComponent);
        ko.components.register("sign-up", signUpBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.signUp;

                appModel.breadcrumbBar = {
                    homePageInfo: appModel.pages.home,
                    currentPageInfo: appModel.currentPage
                }
            }
        };
    };

    return new SignUpPageModule();
});


