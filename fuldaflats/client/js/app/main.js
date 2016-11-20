requirejs(
    [
        'jquery', 'bootstrap', 'knockout', 'jqueryCookie', 'waypoints', 'jqueryConterup',
        'jqueryParallax', 'front', 'owlCarousel', 'knockoutOwlCarousel', 'fuldaflatsApiClient'
    ],
    function($) {
        console.log("Loaded all Scripts");
    });


function appModel(ko) {
    var self = this;
    self.domain = "FuldaFlats.de"
    self.demoWarning = {
        warningMessage: "SFSU/FAU/Fulda Software Engineering Project, Fall 2016. For Demonstration Only"
    };

    self.searchPanelBar = {
        offerTypes: ko.observableArray(["Appartment", "WG", "Couch"])
    }

    self.recentBriefOrderBar = {
        barTitle: "Recent Offers",
        offers: ko.observableArray([
            {
                thumbnailUrl: ko.observable('../img/portfolio-4.jpg'),
                detailsPageUrl: ko.observable(''),
                offerType: ko.observable('WG'),
                title: ko.observable('Title etwas länger und noch was länger'),
                areaSize: ko.observable('50'),
                totalRental: ko.observable('500'),
                rentType: ko.observable('warm'),
            },
            {
                thumbnailUrl: ko.observable('../img/portfolio-4.jpg'),
                detailsPageUrl: ko.observable(''),
                offerType: ko.observable('WG'),
                title: ko.observable('Title etwas länger und noch was länger'),
                areaSize: ko.observable('50'),
                totalRental: ko.observable('500'),
                rentType: ko.observable('warm'),
            },
            {
                thumbnailUrl: ko.observable('../img/portfolio-4.jpg'),
                detailsPageUrl: ko.observable(''),
                offerType: ko.observable('WG'),
                title: ko.observable('Title etwas länger und noch was länger'),
                areaSize: ko.observable('50'),
                totalRental: ko.observable('500'),
                rentType: ko.observable('warm'),
            }, {
                thumbnailUrl: ko.observable('../img/portfolio-4.jpg'),
                detailsPageUrl: ko.observable(''),
                offerType: ko.observable('WG'),
                title: ko.observable('Title etwas länger und noch was länger'),
                areaSize: ko.observable('50'),
                totalRental: ko.observable('500'),
                rentType: ko.observable('warm'),
            }
            , {
                thumbnailUrl: ko.observable('../img/portfolio-4.jpg'),
                detailsPageUrl: ko.observable(''),
                offerType: ko.observable('WG'),
                title: ko.observable('Title etwas länger und noch was länger'),
                areaSize: ko.observable('50'),
                totalRental: ko.observable('500'),
                rentType: ko.observable('warm'),
            }
        ]),
        owlCarouselOptions: {
            items: 4,
            itemsDesktopSmall: [990, 3],
            itemsTablet: [768, 2],
            itemsMobile: [480, 1]
        }
    };

    self.livingInternationalBriefOrderBar = {
        barTitle: "Living International",
        offers: ko.observableArray([
            {
                thumbnailUrl: ko.observable('../img/portfolio-4.jpg'),
                detailsPageUrl: ko.observable(''),
                offerType: ko.observable('WG'),
                title: ko.observable('Title etwas länger und noch was länger'),
                areaSize: ko.observable('50'),
                totalRental: ko.observable('500'),
                rentType: ko.observable('warm'),
            },
            {
                thumbnailUrl: ko.observable('../img/portfolio-4.jpg'),
                detailsPageUrl: ko.observable(''),
                offerType: ko.observable('WG'),
                title: ko.observable('Title etwas länger und noch was länger'),
                areaSize: ko.observable('50'),
                totalRental: ko.observable('500'),
                rentType: ko.observable('warm'),
            },
            {
                thumbnailUrl: ko.observable('../img/portfolio-4.jpg'),
                detailsPageUrl: ko.observable(''),
                offerType: ko.observable('WG'),
                title: ko.observable('Title etwas länger und noch was länger'),
                areaSize: ko.observable('50'),
                totalRental: ko.observable('500'),
                rentType: ko.observable('warm'),
            }, {
                thumbnailUrl: ko.observable('../img/portfolio-4.jpg'),
                detailsPageUrl: ko.observable(''),
                offerType: ko.observable('WG'),
                title: ko.observable('Title etwas länger und noch was länger'),
                areaSize: ko.observable('50'),
                totalRental: ko.observable('500'),
                rentType: ko.observable('warm'),
            }
            , {
                thumbnailUrl: ko.observable('../img/portfolio-4.jpg'),
                detailsPageUrl: ko.observable(''),
                offerType: ko.observable('WG'),
                title: ko.observable('Title etwas länger und noch was länger'),
                areaSize: ko.observable('50'),
                totalRental: ko.observable('500'),
                rentType: ko.observable('warm'),
            }
        ]),
        owlCarouselOptions: {
            items: 4,
            itemsDesktopSmall: [990, 3],
            itemsTablet: [768, 2],
            itemsMobile: [480, 1]
        }
    };

    self.copyrightBar = {
        impressumUrl: "/Impressum.html",
        contactUrl: "mailto:contact@fuldaflats.de",
        termsOfUseUrl: "/TermsOfUse.html",
        copyrightDate: "2016",
        copyrightName: self.domain,
        templateAuthorName: "Bootstrapious",
        templateUrl: "https://bootstrapious.com/free-templates"
    };
}

requirejs(['jquery', 'knockout',
    'app/components/demoWarningBar/demoWarningBar.component',
    'app/components/navigationBar/navigationBar.component',
    'app/components/searchBar/searchBar.component',
    'app/components/copyrightBar/copyrightBar.component',
    'app/components/offerBarSlider/offerBarSlider.component',
    'app/components/tagCloudBar/tagCloudBar.component'],
    function($, ko, demoWarningBarComponent, navigationBarComponent, searchBarComponent, copyrightBarComponent, offerBarSliderComponent, tagCloudBarComponent) {
        ko.components.register("demo-warning", demoWarningBarComponent);
        ko.components.register("navigation", navigationBarComponent);
        ko.components.register("search", searchBarComponent);
        ko.components.register("copyright", copyrightBarComponent);
        ko.components.register("offer-slider", offerBarSliderComponent);
        ko.components.register("tag-cloud", tagCloudBarComponent);

        ko.applyBindings(new appModel(ko));
        console.log("Loaded app");
    });