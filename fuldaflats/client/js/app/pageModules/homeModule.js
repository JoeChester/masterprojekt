define([
    'knockout',
    'app/components/searchBar/searchBar.component',
    'app/components/offerBarSlider/offerBarSlider.component',
    'app/components/tagCloudBar/tagCloudBar.component',
], function (ko, searchBarComponent, offerBarSliderComponent, tagCloudBarComponent) {
    function HomePageModul() {
        var self = this;

        ko.components.register("search", searchBarComponent);
        ko.components.register("offer-slider", offerBarSliderComponent);
        ko.components.register("tag-cloud", tagCloudBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.home;

                appModel.searchPanelBar = {
                    offerTypes: appModel.offerTypes,
                    searchPageInfo: appModel.pages.search
                }

                appModel.recentBriefOrderBar = {
                    barTitle: "Recent Offers",
                    offers: ko.observableArray([
                        {
                            thumbnailUrl: ko.observable('/img/portfolio-4.jpg'),
                            detailsPageUrl: ko.observable('/pages/offerDetailsNotSignInUser.html'),
                            offerType: ko.observable('WG'),
                            title: ko.observable('Title etwas länger und noch was länger'),
                            areaSize: ko.observable('50'),
                            totalRental: ko.observable('500'),
                            rentType: ko.observable('warm'),
                            distanceToUniversity: ko.observable('10'),
                        },
                        {
                            thumbnailUrl: ko.observable('/img/portfolio-4.jpg'),
                            detailsPageUrl: ko.observable('/pages/offerDetailsNotSignInUser.html'),
                            offerType: ko.observable('WG'),
                            title: ko.observable('Title etwas länger und noch was länger'),
                            areaSize: ko.observable('50'),
                            totalRental: ko.observable('500'),
                            rentType: ko.observable('warm'),
                            distanceToUniversity: ko.observable('10'),
                        },
                        {
                            thumbnailUrl: ko.observable('/img/portfolio-4.jpg'),
                            detailsPageUrl: ko.observable('/pages/offerDetailsNotSignInUser.html'),
                            offerType: ko.observable('WG'),
                            title: ko.observable('Title etwas länger und noch was länger'),
                            areaSize: ko.observable('50'),
                            totalRental: ko.observable('500'),
                            rentType: ko.observable('warm'),
                            distanceToUniversity: ko.observable('10'),
                        }, {
                            thumbnailUrl: ko.observable('/img/portfolio-4.jpg'),
                            detailsPageUrl: ko.observable('/pages/offerDetailsNotSignInUser.html'),
                            offerType: ko.observable('WG'),
                            title: ko.observable('Title etwas länger und noch was länger'),
                            areaSize: ko.observable('50'),
                            totalRental: ko.observable('500'),
                            rentType: ko.observable('warm'),
                            distanceToUniversity: ko.observable('10'),
                        }
                        , {
                            thumbnailUrl: ko.observable('/img/portfolio-4.jpg'),
                            detailsPageUrl: ko.observable('/pages/offerDetailsNotSignInUser.html'),
                            offerType: ko.observable('WG'),
                            title: ko.observable('Title etwas länger und noch was länger'),
                            areaSize: ko.observable('50'),
                            totalRental: ko.observable('500'),
                            rentType: ko.observable('warm'),
                            distanceToUniversity: ko.observable('10'),
                        }
                    ]),
                    owlCarouselOptions: {
                        items: 4,
                        itemsDesktopSmall: [990, 3],
                        itemsTablet: [768, 2],
                        itemsMobile: [480, 1]
                    }
                };

                appModel.livingInternationalBriefOrderBar = {
                    barTitle: "Living International",
                    offers: ko.observableArray([
                        {
                            thumbnailUrl: ko.observable('/img/portfolio-4.jpg'),
                            detailsPageUrl: ko.observable('/pages/offerDetailsNotSignInUser.html'),
                            offerType: ko.observable('WG'),
                            title: ko.observable('Title etwas länger und noch was länger'),
                            areaSize: ko.observable('50'),
                            totalRental: ko.observable('500'),
                            rentType: ko.observable('warm'),
                            distanceToUniversity: ko.observable('10'),
                        }, {
                            thumbnailUrl: ko.observable('/img/portfolio-4.jpg'),
                            detailsPageUrl: ko.observable('/pages/offerDetailsNotSignInUser.html'),
                            offerType: ko.observable('WG'),
                            title: ko.observable('Title etwas länger und noch was länger'),
                            areaSize: ko.observable('50'),
                            totalRental: ko.observable('500'),
                            rentType: ko.observable('warm'),
                            distanceToUniversity: ko.observable('10'),
                        },
                        {
                            thumbnailUrl: ko.observable('/img/portfolio-4.jpg'),
                            detailsPageUrl: ko.observable('/pages/offerDetailsNotSignInUser.html'),
                            offerType: ko.observable('WG'),
                            title: ko.observable('Title etwas länger und noch was länger'),
                            areaSize: ko.observable('50'),
                            totalRental: ko.observable('500'),
                            rentType: ko.observable('warm'),
                            distanceToUniversity: ko.observable('10'),
                        }, {
                            thumbnailUrl: ko.observable('/img/portfolio-4.jpg'),
                            detailsPageUrl: ko.observable('/pages/offerDetailsNotSignInUser.html'),
                            offerType: ko.observable('WG'),
                            title: ko.observable('Title etwas länger und noch was länger'),
                            areaSize: ko.observable('50'),
                            totalRental: ko.observable('500'),
                            rentType: ko.observable('warm'),
                            distanceToUniversity: ko.observable('10'),
                        }, {
                            thumbnailUrl: ko.observable('/img/portfolio-4.jpg'),
                            detailsPageUrl: ko.observable('/pages/offerDetailsNotSignInUser.html'),
                            offerType: ko.observable('WG'),
                            title: ko.observable('Title etwas länger und noch was länger'),
                            areaSize: ko.observable('50'),
                            totalRental: ko.observable('500'),
                            rentType: ko.observable('warm'),
                            distanceToUniversity: ko.observable('10'),
                        }
                    ]),
                    owlCarouselOptions: {
                        items: 4,
                        itemsDesktopSmall: [990, 3],
                        itemsTablet: [768, 2],
                        itemsMobile: [480, 1]
                    }
                };

                appModel.tagCloudBar = {
                    searchPageInfo: appModel.pages.search,
                    tagCloudHeight: 150,
                    // todo: find better colors
                    //tagColors: ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffeda0", "#ffffcc"]
                }
            }
        }
    }

    return new HomePageModul();
});


