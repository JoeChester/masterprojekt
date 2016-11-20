//Load default libraries and plugins
requirejs([
    'jquery', 'bootstrap', 'knockout', 'jqueryCookie', 'waypoints', 'jqueryConterup',
    'jqueryParallax', 'front', 'owlCarousel', 'knockoutOwlCarousel', 'fuldaflatsApiClient'
], function($) {
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
            home: { url: "/", title: "Home" },
            search: { url: "/pages/search.html", title: "Search" },
            impressum: { url: "/pages/impressum.html", title: "Impressum" },
            termsOfUse: { url: "/pages/termsOfUse.html", title: "Terms Of Use" },
            contact: { url: "mailto:" + self.contactEmailAddress, title: "Contact" }
        };

        self.offerTypes = ["Appartment", "WG", "Couch"];

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
        '/pages/termsOfUse.html': "app/pageModules/termsOfUseModule"
    }

    // Load Page Module
    var pageModulePath = pagesModules[location.pathname];
    requirejs([pageModulePath], function(pageModule) {
        var appModel = new AppModel(ko);

        if (pageModule && pageModule.initialize) {
            pageModule.initialize(appModel);
        }

        ko.applyBindings(appModel);
    });
});


