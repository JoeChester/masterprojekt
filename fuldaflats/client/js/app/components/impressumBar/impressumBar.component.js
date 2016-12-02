/************************************************************
 * File:            impressumBar.component.js
 * Author:          Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for impressum bar.
 ************************************************************/
define(['text!./impressumBar.component.html', 'css!./impressumBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        function ImpressumModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new ImpressumModel(params);
                }
            },
            template: componentTemplate
        };
    });