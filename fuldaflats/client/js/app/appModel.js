define([
    'jquery', 'knockout', 'fuldaflatsApiClient',
    'app/components/demoWarningBar/demoWarningBar.component',
    'app/components/navigationBar/navigationBar.component',
    'app/components/copyrightBar/copyrightBar.component',
], function($, ko, api, demoWarningBarComponent, navigationBarComponent, copyrightBarComponent) {
    function AppModel($, ko, api, demoWarningBarComponent, navigationBarComponent, copyrightBarComponent) {
        var self = this;

        self.domain = "FuldaFlats.de"
        self.CreationDate = 2016;
        self.logoUrl = "/img/logo.png";

        self.contactEmailAddress = "contact@fuldaflats.de";

        self.demoWarningMessage = "SFSU/FAU/Fulda Software Engineering Project, Fall 2016. For Demonstration Only";

        self.offerTypes = ['FLAT', 'SHARE', 'SUBLET', 'COUCH', 'PARTY'];

        self.currentUser = ko.observable();

        self.currentUser.subscribe(function(newValue) {
            console.log("Current User Changed")
            console.log(newValue)
        });

        /*window.user = self.currentUser;*/

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
            search: ko.observable({ url: "/pages/search", title: "Search" }),
            termsOfUse: ko.observable({ url: "/pages/termsOfUse.html", title: "Terms Of Use" }),
            contact: ko.observable({ url: "mailto:" + self.contactEmailAddress, title: "Contact" }),
        };

        self.pagesModules = {
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
            '/pages/search': "app/pageModules/searchModule",
            '/pages/termsofuse.html': "app/pageModules/termsOfUseModule",

            '/pages/homeWithExtendedSearch.html': "app/pageModules/homeModule",
        }

        self.navigationBar = {
            domain: self.domain,
            logoUrl: self.logoUrl,
            homePageInfo: self.pages.home,
            myProfilePageInfo: self.pages.myProfile,
            becomeLandlordPageInfo: self.pages.becomeLandlord,
            newOfferPageInfo: self.pages.newOffer,
            impressumPageInfo: self.pages.impressum,
            contactPageInfo: self.pages.contact,
            termsOfUsePageInfo: self.pages.termsOfUse,
            currentUser: self.currentUser
        }

        self.copyrightBar = {
            impressumPageInfo: self.pages.impressum,
            contactPageInfo: self.pages.contact,
            termsOfUsePageInfo: self.pages.termsOfUse,
            copyrightDate: self.CreationDate,
            copyrightName: self.domain,
            templateAuthorName: "Bootstrapious",
            templateUrl: "https://bootstrapious.com/free-templates"
        };

        function loadPageModule() {
            var defer = $.Deferred();

            var pageModulePath = self.pagesModules[document.location.pathname.toLowerCase()];
            requirejs([pageModulePath], function(pageModule) {
                if (pageModule && pageModule.initialize) {
                    pageModule.initialize(self);
                    console.log("Loaded page module: \"" + pageModulePath + "\" for location \"" + location.pathname.toLowerCase() + "\"");
                    defer.resolve();
                } else {
                    console.error("Failed to load page module for location \"" + location.pathname.toLowerCase() + "\"");
                    defer.reject();
                }
            });

            return defer.promise();
        }

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

        self.initialize = function() {
            ko.components.register("demo-warning", demoWarningBarComponent);
            ko.components.register("navigation", navigationBarComponent);
            ko.components.register("copyright", copyrightBarComponent);

            api.initialize("api", self.offerTypes);

            api.users.getMe().then(function(user) {
                var userObject = ko.unwrap(user);
                if (userObject) {
                    self.currentUser(userObject);
                }
            }, function(rejectMessage) {
                console.log(rejectMessage);
            });

            loadPageModule().then(function() {
                ko.applyBindings(self, document.getElementsByTagName("html")[0]);
            }, function() {
                throw "Failed to load page module";
            });
        }
    }

    return new AppModel($, ko, api, demoWarningBarComponent, navigationBarComponent, copyrightBarComponent);
});


