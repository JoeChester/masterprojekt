/************************************************************
 * File:            editOfferDetailsBar.component.js
 * Author:          Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for edit offer details bar.
 ************************************************************/
define(['text!./editOfferDetailsBar.component.html', 'css!./editOfferDetailsBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function EditOfferDetailsModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new EditOfferDetailsModel(params);
                }
            },
            template: componentTemplate
        };
    });