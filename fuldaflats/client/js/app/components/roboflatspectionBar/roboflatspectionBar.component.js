/************************************************************
 * File:            offerDetailsBar.component.js
 * Author:          Martin Herbener, Jonas Kleinkauf, Patrick Hasenauer
 * LastMod:         12.12.2016
 * Description:     JS Component Handler offer Details Bar
 ************************************************************/

define(['text!./roboflatspectionBar.component.html', 'css!./roboflatspectionBar.component.css', 'knockout', 'jquery', 'lightbox', 'moment'],
    function (componentTemplate, componentCss, ko, $, lightbox, moment) {

        function RoboFlatspectionModel(params) {

            moment.locale('de');

            var self = this;

            // your model functions and variables
            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            };

            self.currentUser = ko.observable({
                isAuthenticated: false,
                userData: undefined
            });

            self.isAuthenticated = ko.observable(false);
            self.offerId = ko.observable();
            
            //Check Login
            self.checkLogin = function () {
                $.ajax({
                    method: "GET",
                    url: "/api/users/me",
                    contentType: "application/json",
                    success: function (data, status, req) {
                        self.currentUser(data);
                        self.isAuthenticated(true);
                    },
                    error: function (req, status, error) {
                        self.currentUser({});
                        self.isAuthenticated(false);
                    }
                });
            }

            loginCallbacks.push(self.checkLogin);
            self.checkLogin();

            //Get Offer Data
            self.offerId(getURLParameter("offerId") || "");
            if (self.offerId()) {
                //self.getOfferDetails();
            }

            //loginCallbacks.push(self.getOfferDetails);
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var roboFlatspection = new RoboFlatspectionModel();
                    window.roboFlatspection = roboFlatspection;
                    return roboFlatspection;
                }
            },
            template: componentTemplate
        };
    });