/************************************************************
 * File:            offerDetailsBar.component.js
 * Author:          Martin Herbener, Jonas Kleinkauf, Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler offer Details Bar
 ************************************************************/

define(['text!./offerDetailsBar.component.html', 'css!./offerDetailsBar.component.css', 'knockout', 'jquery', 'lightbox'],
    function (componentTemplate, componentCss, ko, $, lightbox) {

        function OfferDetailsModel(params) {
            var self = this;

            // your model functions and variables
            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            };

            self.currentUser = ko.observable({});
            self.isAuthenticated = ko.observable(false);
            self.offerId = ko.observable();
            self.offer = ko.observable({});
            self.landlord = ko.observable({});

            //Check Login
            self.checkLogin = function(){
                $.ajax({
                    method: "GET",
                    url: "/api/users/me",
                    contentType: "application/json",
                    success: function(data, status, req){
                        self.currentUser(data);
                        self.isAuthenticated(true);
                    },
                    error: function(req, status, error){
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
                $.getJSON({
                    url: '/api/offers/' + self.offerId(),
                    success: function (offerData, status, req) {
                        if(offerData){
                            for(var i in offerData.mediaObjects){
                                offerData.mediaObjects[i].carouselIndex = i;
                                offerData.mediaObjects[i].carouselActive = false;
                            }
                            offerData.mediaObjects[0].carouselActive = true;
                            console.log(offerData);
                            self.offer(offerData);
                            if(offerData.landlord){
                                self.landlord(offerData.landlord);
                            }
                        }
                    }
                });
            }
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var offerDetails = new OfferDetailsModel();
                    window.offerDetails = offerDetails;
                    return offerDetails;
                }
            },
            template: componentTemplate
        };
    });