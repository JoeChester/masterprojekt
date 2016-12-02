define(['text!./offerDetailsBar.component.html', 'css!./offerDetailsBar.component.css', 'knockout', 'jquery', 'lightbox'],
    function (componentTemplate, componentCss, ko, $, lightbox) {

        function OfferDetailsModel(params) {
            var self = this;

            // your model functions and variables
            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            };

            self.currentUser = ko.observable({
                isAuthenticated: false,
                userData: undefined
            });

            self.offerId = ko.observable();

            // window.currentUser = self.currentUser;

            self.mediaObjects = ko.observable(
                {
                    "type": 1,
                    "mainUrl": "/uploads/sampleA.jpg",
                    "thumbnailUrl": "/uploads/sampleA.jpg",
                    "creationDate": "26.11.2016",
                    "offerId": 1,
                    "createdByUserId": 1
                }
            );

            self.user = ko.observable(
                {
                    "id": 1,
                    "email": "tony.stark@fuldaflats.de",
                    "type": 2,
                    "firstName": "Tony",
                    "lastName": "Stark",
                    "birthday": "02.05.1972",
                    "upgradeDate": "17.11.2016",
                    "creationDate": "16.11.2016",
                    "phoneNumber": "(+49) 661 152 512",
                    "zipCode": "36037",
                    "city": "Neuhof",
                    "street": "Berliner Str.",
                    "houseNumber": "30",
                    "gender": "male",
                    "officeAddress": "Leipziger Str. 45",
                    "averageRating": 4.5,
                    "favorites": null
                }
            );

            self.offer = ko.observable();

            self.initialize = function (params) {
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
                                self.offer(offerData);
                            }
                        }
                    });
                }

                if (params) {
                    if (params.currentUser && ko.isObservable(params.currentUser)) {
                        self.currentUser = params.currentUser;
                    }
                }
            };
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var offerDetails = new OfferDetailsModel();
                    offerDetails.initialize(params);
                    window.offerDetails = offerDetails;
                    return offerDetails;
                }
            },
            template: componentTemplate
        };
    });