/************************************************************
 * File:            changePasswordBar.component.js
 * Author:          Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for change password bar.
 ************************************************************/
define(['text!./changePasswordBar.component.html', 'css!./changePasswordBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function ChangePasswordModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new ChangePasswordModel(params);
                }
            },
            template: componentTemplate
        };
    });