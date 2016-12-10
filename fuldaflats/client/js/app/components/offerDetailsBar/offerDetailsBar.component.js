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
            self.showReviews = ko.observable(true);
            self.isFavorite = ko.observable(false);

            self.showTags = ko.observable(false);

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

            self.getReviews = function(){
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

            loginCallbacks.push(self.checkLogin);
            self.checkLogin();


            self.getOfferDetails = function(){
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
                            if(offerData.offerType == "FLAT" || offerData.offerType == "SHARE"){
                                self.showReviews(false);
                            }
                            if(offerData.favorite){
                                if(offerData.favorite.length > 0){
                                    self.isFavorite(true); 
                                }
                            }
                            if(offerData.tags){
                                if(offerData.tags.length > 0){
                                    self.showTags(true); 
                                }
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
                self.getReviews();
            }

            //Get Offer Data
            self.offerId(getURLParameter("offerId") || "");
            if (self.offerId()) {
               self.getOfferDetails();
            }

            loginCallbacks.push(self.getReviews);


            //Favorite Functions
            self.setFavorite = function(){
                self.isFavorite(true);
                $.ajax({
                    url: "/api/offers/" + self.offerId() + "/favorite",
                    method: "PUT",
                    success: function(data, status, req){
                        console.log("Favorite Added!");
                    },
                    error: function(req, status, err){
                        errorCallback(JSON.parse(req.responseText));
                        self.isFavorite(false);
                    } 
                });
            }

            self.unsetFavorite = function(){
                self.isFavorite(false);
                $.ajax({
                    url: "/api/offers/" + self.offerId() + "/favorite",
                    method: "DELETE",
                    success: function(data, status, req){
                        console.log("Favorite Removed!");
                    },
                    error: function(req, status, err){
                        console.error(req);
                        errorCallback(err);
                        self.isFavorite(true);
                    } 
                });
            }

            self.sendReview = function(){
                var _review = {};
                _review.rating = parseInt($('#newReviewRating').val());
                _review.title = $('#newReviewTitle').val();
                _review.comment = $('#newReviewComment').val();
                $.ajax({
                    method: "POST",
                    url: "/api/offers/" + self.offerId() + '/review',
                    dataType: "application/json",
                    contentType: "application/json",
                    data: JSON.stringify(_review),
                    success: function(data, status, req){
                        self.getOfferDetails();
                    },
                    error: function(req, status, err){
                        console.error(req);
                        if(req.status == 201){
                            return self.getOfferDetails();
                        }
                        try {
                            errorCallback(JSON.parse(req.responseText));
                        } catch(e) {
                            errorCallback(req.statusText);
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