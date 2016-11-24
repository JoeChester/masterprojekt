//Load default libraries and plugins
requirejs([
    'jquery', 'bootstrap', 'knockout', 'jqueryCookie', 'waypoints', 'jqueryConterup',
    'jqueryParallax', /* 'front', */ 'owlCarousel', 'knockoutOwlCarousel', 'fuldaflatsApiClient', 'bootstrapSwitch'
], function($) {
    var event = new CustomEvent('scripts-loaded');
    document.dispatchEvent(event);
    console.log("Loaded default libraries and plugins.");
});

//Load components / modules for the current pages
requirejs([
    'jquery', 'knockout',
    'app/components/demoWarningBar/demoWarningBar.component',
    'app/components/navigationBar/navigationBar.component',
    'app/components/copyrightBar/copyrightBar.component',
], function($, ko, demoWarningBarComponent, navigationBarComponent, copyrightBarComponent) {

    function AppModel() {
        var self = this;
        self.domain = "FuldaFlats.de"
        self.CreationDate = 2016;

        self.contactEmailAddress = "contact@fuldaflats.de";

        self.pages = {
            becomeLandlord: ko.observable({ url: "/pages/becomeLandlord.html", title: "Become Landlord" }),
            changePassword: ko.observable({ url: "/pages/changePassword.html", title: "Change Password" }),
            editOfferDetails: ko.observable({ url: "/pages/editOfferDetails.html", title: "Edit Offer Details" }),
            editProfileData: ko.observable({ url: "/pages/editProfileData.html", title: "Edit Profile Data" }),
            editProfilePicture: ko.observable({ url: "/pages/editProfilePicture.html", title: "Edit Profile Picture" }),
            home: ko.observable({ url: "/", title: "Home" }),
            impressum: ko.observable({ url: "/pages/impressum.html", title: "Impressum" }),
            myProfile: ko.observable({ url: "/pages/myProfile.html", title: "My Profile" }),
            newOffer: ko.observable({ url: "/pages/newOffer.html", title: "New Offer" }),
            offerDetails: ko.observable({ url: "/pages/offerDetails.html", title: "Offer Details" }),
            search: ko.observable({ url: "/pages/search.html", title: "Search" }),
            termsOfUse: ko.observable({ url: "/pages/termsOfUse.html", title: "Terms Of Use" }),

            contact: ko.observable({ url: "mailto:" + self.contactEmailAddress, title: "Contact" }),
        };

        self.offerTypes = ["Appartment", "WG", "Couch"];

        self.getPageTitle = function() {
            var title = "";
            if (self.domain) {
                title = self.domain;
            }

            if (self.currentPage() && self.currentPage().title) {
                title += ": " + self.currentPage().title;
            }

            return title;
        }

        // DemoData / Bar Content
        self.demoWarning = {
            warningMessage: "SFSU/FAU/Fulda Software Engineering Project, Fall 2016. For Demonstration Only"
        };

        self.copyrightBar = {
            impressumPageInfo: self.pages.impressum,
            contactPageInfo: self.pages.contact,
            termsOfUsePageInfo: self.pages.termsOfUse,
            copyrightDate: self.CreationDate,
            copyrightName: self.domain,
            templateAuthorName: "Bootstrapious",
            templateUrl: "https://bootstrapious.com/free-templates"
        };
    }

    ko.components.register("demo-warning", demoWarningBarComponent);
    ko.components.register("navigation", navigationBarComponent);
    ko.components.register("copyright", copyrightBarComponent);

    // Dictionary <location.pathname.toLowerCase><page mode path>
    var pagesModules = {
        "/pages/becomelandlord.html": "app/pageModules/becomeLandlordModule",
        "/pages/changepassword.html": "app/pageModules/changePasswordModule",
        "/pages/editofferdetails.html": "app/pageModules/editOfferDetailsModule",
        "/pages/editprofiledata.html": "app/pageModules/editProfileDataModule",
        "/pages/editprofilepicture.html": "app/pageModules/editProfilePictureModule",
        '/': "app/pageModules/homeModule",
        '/index.html': "app/pageModules/homeModule",
        '/pages/impressum.html': "app/pageModules/impressumModule",
        "/pages/myprofile.html": "app/pageModules/myProfileModule",
        "/pages/newoffer.html": "app/pageModules/newOfferModule",
        "/pages/offerdetails.html": "app/pageModules/offerDetailsModule",
        '/pages/search.html': "app/pageModules/searchModule",
        '/pages/termsofuse.html': "app/pageModules/termsOfUseModule",

        '/pages/homeWithExtendedSearch.html': "app/pageModules/homeModule",
    }

    // Load Page Module
    var pageModulePath = pagesModules[location.pathname.toLowerCase()];
    requirejs([pageModulePath], function(pageModule) {
        var appModel = new AppModel(ko);

        if (pageModule && pageModule.initialize) {
            pageModule.initialize(appModel);
        }

        ko.applyBindings(appModel, document.getElementsByTagName("html")[0]);
    });
});


