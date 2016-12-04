/************************************************************
 * File:            editOfferDetailsBar.component.js
 * Author:          Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for edit offer details bar.
 ************************************************************/
define(['text!./editOfferDetailsBar.component.html',
    'css!./editOfferDetailsBar.component.css',
    'app/components/fileUploaderModal/fileUploaderModal.component',
    'knockout', 'jquery'],
    function (componentTemplate, componentCss, fileUploaderModalComponent, ko, $) {
        function EditOfferDetailsModel(params) {
            // your model functions and variables
            var self = this;
            self.currentUser = ko.isObservable(
                {
                    isAuthenticated: false,
                    userData: undefined
                }
            );

            self.initialize = function (params) {
                if (params) {
                    if (params.currentUser && ko.isObservable(params.currentUser)) {
                        self.currentUser = params.currentUser;
                    }
                }
            };
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    ko.components.register("fileUploaderModal", fileUploaderModalComponent);

                    var editOfferDetails = new EditOfferDetailsModel(params);
                    editOfferDetails.initialize(params);
                    
                    window.editOffer = editOfferDetails;

                    return editOfferDetails;
                }
            },
            template: componentTemplate
        };
    });