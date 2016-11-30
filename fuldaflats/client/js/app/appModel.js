define([
    'jquery', 'knockout', 'fuldaflatsApiClient',
    'app/components/demoWarningBar/demoWarningBar.component',
    'app/components/navigationBar/navigationBar.component',
    'app/components/copyrightBar/copyrightBar.component',
], function ($, ko, api, demoWarningBarComponent, navigationBarComponent, copyrightBarComponent) {
    function AppModel($, ko, api, demoWarningBarComponent, navigationBarComponent, copyrightBarComponent) {
        var self = this;

        self.domain = "FuldaFlats.de"
        self.CreationDate = 2016;
        self.logoUrl = "/img/logo.png";

        self.contactEmailAddress = "contact@fuldaflats.de";

        self.demoWarningMessage = "SFSU/FAU/Fulda Software Engineering Project, Fall 2016. For Demonstration Only";

        self.offerTypes = ['FLAT', 'SHARE', 'SUBLET', 'COUCH', 'PARTY'];

        self.currentUser = ko.observable({
            isAuthenticated: false,
            userData: undefined
        });

        self.currentUser.subscribe(function (newValue) {
            console.log("Current User Status Changed")
            console.log(newValue)
        });

        /*window.user = self.currentUser;*/

        self.pages = {
            becomeLandlord: ko.observable({ url: "/pages/becomeLandlord", title: "Become Landlord" }),
            changePassword: ko.observable({ url: "/pages/changePassword", title: "Change Password" }),
            editOfferDetails: ko.observable({ url: "/pages/editOfferDetails", title: "Edit Offer Details" }),
            editProfileData: ko.observable({ url: "/pages/editProfileData", title: "Edit Profile Data" }),
            editProfilePicture: ko.observable({ url: "/pages/editProfilePicture", title: "Edit Profile Picture" }),
            home: ko.observable({ url: "/", title: "Home" }),
            impressum: ko.observable({ url: "/pages/impressum", title: "Impressum" }),
            myProfile: ko.observable({ url: "/pages/myProfile", title: "My Profile" }),
            newOffer: ko.observable({ url: "/pages/newOffer", title: "New Offer" }),
            offerDetails: ko.observable({ url: "/pages/offerDetails", title: "Offer Details" }),
            search: ko.observable({ url: "/pages/search", title: "Search" }),
            termsOfUse: ko.observable({ url: "/pages/termsOfUse", title: "Terms Of Use" }),
            contact: ko.observable({ url: "mailto:" + self.contactEmailAddress, title: "Contact" }),
        };

        self.pagesModules = {
            "/pages/becomelandlord": "app/pageModules/becomeLandlordModule",
            "/pages/changepassword": "app/pageModules/changePasswordModule",
            "/pages/editofferdetails": "app/pageModules/editOfferDetailsModule",
            "/pages/editprofiledata": "app/pageModules/editProfileDataModule",
            "/pages/editprofilepicture": "app/pageModules/editProfilePictureModule",
            '/': "app/pageModules/homeModule",
            '/index': "app/pageModules/homeModule",
            '/pages/impressum': "app/pageModules/impressumModule",
            "/pages/myprofile": "app/pageModules/myProfileModule",
            "/pages/newoffer": "app/pageModules/newOfferModule",
            "/pages/offerdetails": "app/pageModules/offerDetailsModule",
            '/pages/search': "app/pageModules/searchModule",
            '/pages/termsofuse': "app/pageModules/termsOfUseModule",

            '/pages/homeWithExtendedSearch': "app/pageModules/homeModule",
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
            requirejs([pageModulePath], function (pageModule) {
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

        self.getPageTitle = function () {
            var title = "";
            if (self.domain) {
                title = self.domain;
            }

            if (self.currentPage() && self.currentPage().title) {
                title += ": " + self.currentPage().title;
            }

            return title;
        }

        self.initialize = function () {
            ko.components.register("demo-warning", demoWarningBarComponent);
            ko.components.register("navigation", navigationBarComponent);
            ko.components.register("copyright", copyrightBarComponent);

            api.initialize("api", self.offerTypes);

            api.users.getMe().then(function (user) {
                var userObject = ko.unwrap(user);
                if (userObject) {
                    self.currentUser(userObject);
                }
            }, function (rejectMessage) {
                console.log(rejectMessage);
            });

            loadPageModule().then(function () {
                ko.applyBindings(self, document.getElementsByTagName("html")[0]);
            }, function () {
                throw "Failed to load page module";
            });
        }
    }

    return new AppModel($, ko, api, demoWarningBarComponent, navigationBarComponent, copyrightBarComponent);
});


