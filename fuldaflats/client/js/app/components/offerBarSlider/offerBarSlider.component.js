define(['text!./offerBarSlider.component.html', 'css!./offerBarSlider.component.css', 'knockout'],
    function(componentTemplate, componentCss, ko) {
        function OfferSliderModel(ko) {
            var self = this;
            self.owlCarouselOptions = {};
            self.barTitle = ko.observable();
            self.offerDetailsPageInfo = ko.observable();
            self.offers = ko.observableArray();

            self.viewDetails = function(offer, item) {
                if (offer.id && self.offerDetailsPageInfo() && self.offerDetailsPageInfo().url) {
                    var offerId = offer.id;
                    document.location.href = self.offerDetailsPageInfo().url + "?offerId=" + offerId;
                }
            };

            self.getTotalOfferRent = function(offer) {
                var totalRent = 0;

                if (offer.rent) {
                    totalRent += offer.rent;
                }
                if (offer.sideCosts) {
                    totalRent += offer.sideCosts;
                }

                return totalRent;
            };

            self.initialize = function(params) {
                if (params) {
                    self.barTitle(ko.unwrap(params.barTitle || ''));
                    self.offerDetailsPageInfo(ko.unwrap(params.offerDetailsPageInfo || ''));

                    if (ko.isObservable(params.offers)) {
                        self.offers = params.offers;
                    }

                    self.owlCarouselOptions = ko.unwrap(params.owlCarouselOptions);
                }
            };
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var viewModel = new OfferSliderModel(ko);
                    viewModel.initialize(params);
                    return viewModel;
                }
            },
            template: componentTemplate
        };
    });