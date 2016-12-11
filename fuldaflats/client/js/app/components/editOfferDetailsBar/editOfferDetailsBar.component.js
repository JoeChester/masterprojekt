/************************************************************
 * File:            editOfferDetailsBar.component.js
 * Author:          Martin Herbener, Patrick Hasenauer
 * LastMod:         11.12.2016
 * Description:     JS Component Handler for edit offer details bar.
 ************************************************************/
define(['text!./editOfferDetailsBar.component.html',
    'css!./editOfferDetailsBar.component.css',
    'app/components/fileUploaderModal/fileUploaderModal.component',
    'knockout', 'jquery', 'fuldaflatsApiClient'],
    function (componentTemplate, componentCss, fileUploaderModalComponent, ko, $, api) {
        function EditOfferDetailsModel(params) {

            // your model functions and variables
            var self = this;

            //  Main Observables
            self.offer = ko.observable({});
            self.offerId = ko.observable();
            self.offerChanges = ko.observable({});
            self.isAuthenticated = ko.observable(false);
            self.landlord = ko.observable({});
            self.currentUser = ko.observable(
                {
                    isAuthenticated: false,
                    userData: undefined
                }
            );

            // Checkbox Observables
            self.status = ko.observable(0);
            self.cellar = ko.observable(0);
            self.parking = ko.observable(0);
            self.elevator = ko.observable(0);
            self.dryer = ko.observable(0);
            self.washingMachine = ko.observable(0);
            self.telephone = ko.observable(0);
            self.furnished = ko.observable(0);
            self.pets = ko.observable(0);
            self.wlan = ko.observable(0);
            self.lan = ko.observable(0);
            self.accessability = ko.observable(0);

            // Select Observables
            self.television = ko.observable();
            self.heatingDescription = ko.observable();
            self.bathroomDescription = ko.observable();
            self.kitchenDescription = ko.observable();


            // Get URL Data
            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            };

            //Check Login
            self.checkLogin = function () {
                $.ajax({
                    method: "GET",
                    url: "/api/users/me",
                    contentType: "application/json",
                    success: function (data, status, req) {
                        console.log("User-Data:");
                        console.log(data);
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
                loadPage();
            }

            // Reload Data after Media upload
            function loadPage() {
                $.getJSON({
                    url: '/api/offers/' + self.offerId(),
                    success: function (offerData, status, req) {
                        if (offerData) {
                            for (var i in offerData.mediaObjects) {
                                offerData.mediaObjects[i].carouselIndex = i;
                                offerData.mediaObjects[i].carouselActive = false;
                            }
                            offerData.mediaObjects[0].carouselActive = true;
                            console.log("Offer-Data:");
                            console.log(offerData);
                            self.offer(offerData);
                            self.status(offerData.status);
                            self.cellar(offerData.cellar);
                            self.parking(offerData.parking);
                            self.elevator(offerData.elevator);
                            self.dryer(offerData.dryer);
                            self.washingMachine(offerData.washingMachine);
                            self.telephone(offerData.telephone);
                            self.furnished(offerData.furnished);
                            self.pets(offerData.pets);
                            self.wlan(offerData.wlan);
                            self.lan(offerData.lan);
                            self.accessability(offerData.accessability);
                            self.television(offerData.television);
                            self.heatingDescription(offerData.heatingDescription);
                            self.bathroomDescription(offerData.bathroomDescription);
                            self.kitchenDescription(offerData.kitchenDescription);
                            if (offerData.landlord) {
                                self.landlord(offerData.landlord);
                            }
                        }
                    }
                })
            };

            // File Upload Modal
            self.bindFileUploadModalEvents = function (model, event) {
                if (event && event.currentTarget) {
                    var dialogId = event.currentTarget.getAttribute("data-target");
                    var dialogContainer = $(dialogId);
                    if (dialogContainer.length > 0) {
                        dialogContainer.on('hide.bs.modal', loadPage);
                    } else {
                        console.error("Failed to bind file upload dialog events.");
                    }
                }
            };

            // Cancel Button
            self.cancelEditOffer = function () {
                console.log("Cancel gedrückt");
                window.history.back();
            };

            // Accept Button
            self.updateOffer = function () {
                self.offerChanges().status = self.status();
                self.offerChanges().cellar = self.cellar();
                self.offerChanges().parking = self.parking();
                self.offerChanges().elevator = self.elevator();
                self.offerChanges().dryer = self.dryer();
                self.offerChanges().washingMachine = self.washingMachine();
                self.offerChanges().telephone = self.telephone();
                self.offerChanges().furnished = self.furnished();
                self.offerChanges().pets = self.pets();
                self.offerChanges().wlan = self.wlan();
                self.offerChanges().lan = self.lan();
                self.offerChanges().accessability = self.accessability();
                self.offerChanges().television = self.television();
                self.offerChanges().heatingDescription = self.heatingDescription();
                self.offerChanges().bathroomDescription = self.bathroomDescription();
                self.offerChanges().kitchenDescription = self.kitchenDescription();

                var _offerChanges = ko.toJSON(self.offerChanges);

                $.ajax({
                    method: "PUT",
                    url: '/api/offers/' + self.offerId(),
                    dataType: "application/json",
                    contentType: "application/json",
                    data: _offerChanges,
                    success: function (data, status, req) {
                        window.location = "/pages/myProfile";
                    },
                    error: function (req, status, error) {
                        if (req.status == 200) {
                            window.location = "/pages/myProfile";
                            return;
                        }
                        errorCallback(error);
                    }
                });
                console.log("Update gedrückt");
            }
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    ko.components.register("file-uploader", fileUploaderModalComponent);
                    var viewModel = new EditOfferDetailsModel(params);
                    window.model = viewModel;
                    return viewModel;
                }
            },
            template: componentTemplate
        };
    });
