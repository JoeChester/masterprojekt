define([
    'knockout',
    'app/components/searchBar/searchBar.component',
    'app/components/offerBarSlider/offerBarSlider.component',
    'app/components/tagCloudBar/tagCloudBar.component',
    'fuldaflatsApiClient'
], function(ko, searchBarComponent, offerBarSliderComponent, tagCloudBarComponent, api) {
    function HomePageModul(tagCloudBarComponent, api) {
        var self = this;

        var recentOffers = ko.observableArray();
        var internationalOffers = ko.observableArray();

        ko.components.register("search", searchBarComponent);
        ko.components.register("offer-slider", offerBarSliderComponent);
        ko.components.register("tag-cloud", tagCloudBarComponent);

        self.initialize = function(appModel) {
            if (appModel) {
                api.offers.getRecentOffers().then(function(recentOffersResult) {
                    recentOffers(ko.unwrap(recentOffersResult) || [])
                });

                appModel.currentPage = appModel.pages.home;

                appModel.searchPanelBar = {
                    offerTypes: appModel.offerTypes,
                    searchPageInfo: appModel.pages.search
                }

                appModel.recentBriefOrderBar = {
                    barTitle: "Recent Offers",
                    offerDetailsPageInfo: appModel.pages.offerDetails,
                    offers: recentOffers,
                    owlCarouselOptions: {
                        items: 4,
                        itemsDesktopSmall: [990, 3],
                        itemsTablet: [768, 2],
                        itemsMobile: [480, 1]
                    }
                };

                //todo: Query International offers
                appModel.livingInternationalBriefOrderBar = {
                    barTitle: "Living International",
                    offerDetailsPageInfo: appModel.pages.offerDetails,
                    offers: internationalOffers,
                    owlCarouselOptions: {
                        items: 4,
                        itemsDesktopSmall: [990, 3],
                        itemsTablet: [768, 2],
                        itemsMobile: [480, 1]
                    }
                };

                appModel.tagCloudBar = {
                    searchPageInfo: appModel.pages.search,
                    tagCloudOptions: {
                        height: 150
                    },
                }
            }
        }
    }

    return new HomePageModul(tagCloudBarComponent, api);
});


