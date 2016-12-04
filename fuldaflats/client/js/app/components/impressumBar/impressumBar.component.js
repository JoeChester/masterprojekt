/************************************************************
 * File:            impressumBar.component.js
 * Author:          Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for impressum bar.
 ************************************************************/
define(['text!./impressumBar.component.html', 'css!./impressumBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        function ImpressumModel(ko, $) {
            var self = this;
            // your model functions and variables

            self.organisationName = ko.observable();
            self.street = ko.observable();
            self.housenumber = ko.observable();
            self.city = ko.observable();
            self.zipCode = ko.observable();
            self.country = ko.observable();
            self.phone = ko.observable();
            self.email = ko.observable();

            self.initialize = function (params, dialogContainerElement, contactMapElement) {
                if (params) {
                    self.organisationName(params.organisationName || "");
                    self.street(params.street || "");
                    self.housenumber(params.housenumber || "");
                    self.city(params.city || "");
                    self.zipCode(params.zipCode || "");
                    self.country(params.country || "");
                    self.phone(params.phone || "");
                    self.email(params.email || "");
                }
            };
        };

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var impressum = new ImpressumModel(ko, $);
                    impressum.initialize(params);
                    return impressum;
                }
            },
            template: componentTemplate
        };
    });