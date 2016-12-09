/************************************************************
 * File:            offerDetailsBar.component.js
 * Author:          Martin Herbener, Jonas Kleinkauf, Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler offer Details Bar
 ************************************************************/

define(['text!./offerDetailsBar.component.html', 'css!./offerDetailsBar.component.css', 'knockout', 'jquery', 'lightbox', 'moment'],
    function (componentTemplate, componentCss, ko, $, lightbox, moment) {

        function OfferDetailsModel(params) {

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
            self.offer = ko.observable({});
            self.landlord = ko.observable({});

            self.reviews = ko.observableArray([]);

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
                //Get offer Details
                $.getJSON({
                    url: '/api/offers/' + self.offerId(),
                    success: function (offerData, status, req) {
                        if (offerData) {
                            for (var i in offerData.mediaObjects) {
                                offerData.mediaObjects[i].carouselIndex = i;
                                offerData.mediaObjects[i].carouselActive = false;
                            }
                            offerData.mediaObjects[0].carouselActive = true;
                            for (var j in offerData.reviews) {
                                offerData.reviews[j].creationDate = moment(offerData.reviews[j].creationDate).format('L');
                            }
                            console.log(offerData);
                            self.offer(offerData);
                            if (offerData.landlord) {
                                self.landlord(offerData.landlord);
                            }
                        }
                    }
                });
                //Get Offer Reviews as seperate model for better handling
                $.getJSON({
                    url: '/api/offers/' + self.offerId() + '/review',
                    success: function(reviewsData, status, req){
                        self.reviews.removeAll();
                        for(var i in reviewsData){
                            reviewsData[i].creationDate = moment(reviewsData[i].creationDate).format('L');
                            self.reviews.push(reviewsData[i]);
                        }
                        console.log(self.reviews());
                    },
                    error: function(req, status, error){
                        self.reviews.removeAll();
                    }
                });
            }

            self.sendReview = function(){
                var _review = {};
                _review.rating = parseInt($('#newReviewRating').val());
                _review.title = $('#newReviewTitle').val();
                _review.comment = $('#newReviewComment').val();
                console.log(_review);
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