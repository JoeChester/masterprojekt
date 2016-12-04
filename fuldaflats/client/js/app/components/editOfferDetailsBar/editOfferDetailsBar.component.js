/************************************************************
 * File:            editOfferDetailsBar.component.js
 * Author:          Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for edit offer details bar.
 ************************************************************/
define(['text!./editOfferDetailsBar.component.html',
    'css!./editOfferDetailsBar.component.css',
    'app/components/fileUploaderModal/fileUploaderModal.component',
    'knockout', 'jquery', 'fuldaflatsApiClient'],
    function (componentTemplate, componentCss, fileUploaderModalComponent, ko, $, api) {
        function EditOfferDetailsModel(ko, $, api) {
            // your model functions and variables
            var self = this;
            self.offer = ko.observable();
            self.currentUser = ko.observable(
                {
                    isAuthenticated: false,
                    userData: undefined
                }
            );

            self.offerLoadingError = ko.observable(false);
            self.offerLandlordIsNotCurrentUser = ko.observable(false);
            self.currentUserIsNotALandlord = ko.observable(false);

            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            };

            function isCurrentUserEqualsLandlord(landlord) {
                var areEquals = false;

                var localLandlord = ko.unwrap(landlord);
                var localCurrentUser = ko.unwrap(self.currentUser);

                if (localLandlord && localCurrentUser &&
                    localCurrentUser.isAuthenticated && localCurrentUser.userData
                    && localLandlord.id === localCurrentUser.userData.id) {
                    areEquals = true;
                }

                return areEquals;
            }

            function isCurrentUserALandlord() {
                var isLandlord = false;

                var localCurrentUser = ko.unwrap(self.currentUser);

                if (localCurrentUser && localCurrentUser.isAuthenticated &&
                    localCurrentUser.userData && localCurrentUser.userData.type === 2) {
                    isLandlord = true;
                }

                return isLandlord;
            }

            function loadRequestOffer() {
                if (!isCurrentUserALandlord()) {
                    self.currentUserIsNotALandlord(true);
                } else {
                    var offerId = getURLParameter("offerId");
                    api.offers.getOfferById(offerId).then(
                        function (requestedOffer) {
                            var requestOfferValue = ko.unwrap(requestedOffer);
                            if (requestOfferValue) {
                                if (!isCurrentUserALandlord()) {
                                    self.currentUserIsNotALandlord(true);
                                } else if (!isCurrentUserEqualsLandlord(requestOfferValue.landlord)) {
                                    self.offerLandlordIsNotCurrentUser(true);
                                }
                                else {
                                    self.offer(requestOfferValue);
                                    self.offerLoadingError(false);
                                    self.currentUserIsNotALandlord(false);
                                    self.offerLandlordIsNotCurrentUser(false);
                                }
                            } else {
                                self.offerLoadingError(true);
                            }
                        },
                        function (xhr) {
                            self.offerLoadingError(true);
                        }
                    );
                }
            };

            self.cancelEditOffer = function () {
                window.history.back();
            };

            self.updateOffer = function () {
                // update logic with validation
            }

            self.initialize = function (params) {
                if (params) {
                    if (params.currentUser && ko.isObservable(params.currentUser)) {
                        self.currentUser = params.currentUser;
                    }
                }

                self.currentUser.subscribe(function (currentUser) {
                    loadRequestOffer();
                });

                loadRequestOffer();
            };
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    ko.components.register("fileUploaderModal", fileUploaderModalComponent);

                    var editOfferDetails = new EditOfferDetailsModel(ko, $, api);
                    editOfferDetails.initialize(params);

                    window.editOffer = editOfferDetails;

                    return editOfferDetails;
                }
            },
            template: componentTemplate
        };
    });