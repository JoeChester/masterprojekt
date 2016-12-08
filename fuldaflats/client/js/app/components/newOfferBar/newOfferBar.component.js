/************************************************************
 * File:            newOfferBar.component.js
 * Author:          Patrick Hasenauer
 * LastMod:         08.12.2016
 * Description:     JS Component Handler for new offer bar.
 ************************************************************/
define(['text!./newOfferBar.component.html', 'css!./newOfferBar.component.css', 'app/components/fileUploaderModal/fileUploaderModal.component',
    'knockout', 'jquery', 'fuldaflatsApiClient'],
    function(componentTemplate, componentCss, fileUploaderModalComponent, ko, $, api) {
        function NewOfferModel(ko, $, api) {
            var self = this;
            // your model functions and variables
            self.tabsContainer = ko.observable();
            self.offer = api.offers.getOfferModel();
            self.offerDetailsPageInfo = ko.observable();
            self.currentUser = ko.observable(
                {
                    isAuthenticated: false,
                    userData: undefined
                }
            );

            self.offerCreationError = ko.observable(true);
            self.offerLandlordIsNotCurrentUser = ko.observable(false);
            self.currentUserIsNotALandlord = ko.observable(false);
            self.offerLoadingError = ko.observable(false);

            function resetErrors() {
                self.offerCreationError(false);
                self.offerLandlordIsNotCurrentUser(false);
                self.currentUserIsNotALandlord(false);
                self.offerLoadingError(false);
            };

            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            };

            function activateTabNav(navElement) {
                if (navElement && typeof navElement.attr === "function") {
                    var parentListElement = navElement.parent("li");
                    if (parentListElement.length > 0) {
                        parentListElement.removeClass("disabled");
                        navElement.attr("data-toggle", "tab");
                    }
                }
            };

            function isCurrentUserALandlord() {
                var isLandlord = false;

                var localCurrentUser = ko.unwrap(self.currentUser);

                if (localCurrentUser && localCurrentUser.isAuthenticated &&
                    localCurrentUser.userData && localCurrentUser.userData.type === 2) {
                    isLandlord = true;
                }

                return isLandlord;
            };

            function reloadOffer() {
                if (!isCurrentUserALandlord()) {
                    self.currentUserIsNotALandlord(true);
                } else if (self.offer() && !isNaN(self.offer().id())) {
                    api.offers.getOfferById(self.offer().id()).then(
                        function(requestedOffer) {
                            var requestOfferValue = ko.unwrap(requestedOffer);
                            if (requestOfferValue) {
                                if (!isCurrentUserALandlord()) {
                                    self.currentUserIsNotALandlord(true);
                                } else if (!isCurrentUserEqualsLandlord(requestOfferValue.landlord)) {
                                    self.offerLandlordIsNotCurrentUser(true);
                                }
                                else {
                                    self.offer(requestOfferValue);
                                    resetErrors();
                                }
                            } else {
                                self.offerLoadingError(true);
                            }
                        },
                        function(xhr) {
                            self.offerLoadingError(true);
                        }
                    );
                }
            };

            function createOffer() {
                if (!isCurrentUserALandlord()) {
                    self.currentUserIsNotALandlord(true);
                } else {
                    api.offers.createOffer().then(
                        function(newOffer) {
                            var newOfferValue = ko.unwrap(newOffer);
                            self.offer(newOfferValue);
                        },
                        function(xhr) {
                            self.offerCreationError(true);
                        }
                    );
                }
            };

            self.bindFileUploadModalEvents = function(model, event) {
                if (event && event.currentTarget) {
                    var dialogId = event.currentTarget.getAttribute("data-target");
                    var dialogContainer = $(dialogId);
                    if (dialogContainer.length > 0) {
                        dialogContainer.on('hide.bs.modal', reloadOffer);
                    } else {
                        console.error("Failed to bind file upload dialog events.");
                    }
                }
            };

            self.goNextStep = function(model, event) {
                if (self.tabsContainer() && event.currentTarget) {
                    var nextTabId = event.currentTarget.getAttribute("next-tab");
                    var nextTabNav = self.tabsContainer().find('.nav a[href="' + nextTabId + '"]');
                    if (nextTabNav.length > 0) {
                        nextTabNav.tab('show');
                        activateTabNav(nextTabNav);
                    }
                }
                // pre Validation
                // update offer
                // response validation / handling
                // go next or show error
                // when go next create browser history
                // return true -> next tab
            };

            self.cancelCreation = function() {
                window.history.back();
            };

            self.updateOffer = function() {
                // validation logik
                api.offers.updatedOffer(self.offer).then(
                    function() {
                        if (self.offerDetailsPageInfo() && self.offerDetailsPageInfo().url) {
                            window.location.href = self.offerDetailsPageInfo().url + "?offerId=" + self.offer().id();
                        } else {
                            window.location.href = "/";
                        }
                    },
                    function() {
                        // redponse validation logik
                    }
                );
            };

            self.initialize = function(params, tabsContainer) {
                self.tabsContainer(tabsContainer || "");

                if (params) {
                    self.offerDetailsPageInfo(ko.unwrap(params.offerDetailsPageInfo || ''));

                    if (params.currentUser && ko.isObservable(params.currentUser)) {
                        self.currentUser = params.currentUser;
                    }
                }

                self.currentUser.subscribe(function(currentUser) {
                    reloadOffer();
                });

                createOffer();
            };
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    ko.components.register("file-uploader", fileUploaderModalComponent);

                    var viewModel = null;
                    var templateRoot = $(componentInfo.element);
                    if (templateRoot.length > 0) {
                        var tabsContainer = templateRoot.find(".tabs");
                        if (tabsContainer.length > 0) {
                            var viewModel = new NewOfferModel(ko, $, api);
                            viewModel.initialize(params, tabsContainer);
                        }
                    }

                    window.model = viewModel;

                    return viewModel;
                }
            },
            template: componentTemplate
        };
    });