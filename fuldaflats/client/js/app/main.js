//Load default libraries and plugins
requirejs([
    'jquery', 'bootstrap', 'knockout', 'jqueryCookie', 'waypoints', 'jqueryConterup',
    'jqueryParallax', 'front', 'owlCarousel', 'knockoutOwlCarousel', 'fuldaflatsApiClient', 'bootstrapSwitch'
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
            home: ko.observable({ url: "/", title: "Home" }),
            search: ko.observable({ url: "/pages/search.html", title: "Search" }),
            impressum: ko.observable({ url: "/pages/impressum.html", title: "Impressum" }),
            termsOfUse: ko.observable({ url: "/pages/termsOfUse.html", title: "Terms Of Use" }),
            contact: ko.observable({ url: "mailto:" + self.contactEmailAddress, title: "Contact" }),
            myProfile: ko.observable({ url: "/pages/myProfile.html", title: "My Profile" }),
            editProfileData: ko.observable({ url: "/pages/editProfileData.html", title: "Edit Profile Data" }),
            editProfilePicture: ko.observable({ url: "/pages/editProfilePicture.html", title: "Edit Profile Picture" }),
            changePassword: ko.observable({ url: "/pages/changePassword.html", title: "Change Password" }),
            becomeLandlord: ko.observable({ url: "/pages/becomeLandlord.html", title: "Become Landlord" }),
            newOffer: ko.observable({ url: "/pages/newOffer.html", title: "New Offer" }),
            signIn: ko.observable({ url: "/pages/signIn.html", title: "Sign In" }),
            signUp: ko.observable({ url: "/pages/signUp.html", title: "Sign Up" }),
            signOut: ko.observable({ url: "/pages/signOut.html", title: "Sign Out" }),
            offerOverview: ko.observable({ url: "/pages/offerOverview.html", title: "Offer Overview" }),
            favoritesOverview: ko.observable({ url: "/pages/favoritesOverview.html", title: "Favorites Overview" }),
            editOffer: ko.observable({ url: "/pages/editOffer.html", title: "Edit Offer" }),
            offerDetails: ko.observable({ url: "/pages/offerDetails.html", title: "Offer Details" }),
            offerDetails: ko.observable({ url: "/pages/offerDetailsNotSignInUser.html", title: "Offer Details" }),
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

    // Dictionary <location.pathname><page mode path>
    var pagesModules = {
        '/': "app/pageModules/homeModule",
        '/index.html': "app/pageModules/homeModule",
        '/pages/search.html': "app/pageModules/searchModule",
        '/pages/impressum.html': "app/pageModules/impressumModule",
        '/pages/termsOfUse.html': "app/pageModules/termsOfUseModule",
        "/pages/myProfile.html": "app/pageModules/myProfileModule",
        "/pages/editProfileData.html": "app/pageModules/editProfileDataModule",
        "/pages/editProfilePicture.html": "app/pageModules/editProfilePictureModule",
        "/pages/changePassword.html": "app/pageModules/changePasswordModule",
        "/pages/becomeLandlord.html": "app/pageModules/becomeLandlordModule",
        "/pages/newOffer.html": "app/pageModules/newOfferModule",
        "/pages/signIn.html": "app/pageModules/signInModule",
        "/pages/signUp.html": "app/pageModules/signUpModule",
        "/pages/signOut.html": "app/pageModules/signOutModule",
        "/pages/offerOverview.html": "app/pageModules/offerOverviewModule",
        "/pages/favoritesOverview.html": "app/pageModules/favoritesOverviewModule",
        "/pages/editOffer.html": "app/pageModules/editOfferModule",
        "/pages/offerDetails.html": "app/pageModules/offerDetailsModule",
        "/pages/offerDetailsNotSignInUser.html": "app/pageModules/offerDetailsModule",

        '/pages/homeWithExtendedSearch.html': "app/pageModules/homeModule",
    }

    // Load Page Module
    var pageModulePath = pagesModules[location.pathname];
    requirejs([pageModulePath], function(pageModule) {
        var appModel = new AppModel(ko);

        if (pageModule && pageModule.initialize) {
            pageModule.initialize(appModel);
        }

        ko.applyBindings(appModel, document.getElementsByTagName("html")[0]);
    });
});


