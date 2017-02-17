/************************************************************
 * File:            offerDetailsModule.js
 * Author:          Patrick Hasenauer, Martin Heberner
 * LastMod:         02.12.2016
 * Description:     Offer details page module.
 ************************************************************/
define([
    'knockout',
    'app/components/breadcrumbBar/breadcrumbBar.component',
    'app/components/roboflatspectionBar/roboflatspectionBar.component'
], function (ko, breadcrumbBarComponent, roboflatspectionBarComponent) {
    function RoboFlatspecionPageModule() {
        var self = this;

        ko.components.register("breadcrumb", breadcrumbBarComponent);
        ko.components.register("roboflatspection", roboflatspectionBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.roboflatspection;

                appModel.breadcrumbBar = {
                    homePageInfo: appModel.pages.home,
                    currentPageInfo: appModel.currentPage
                }

                appModel.roboflatspectionBar = {
                    currentUser: appModel.currentUser
                }
            }
        };
    };
    
    return new RoboFlatspecionPageModule();
});