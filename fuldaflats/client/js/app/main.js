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
        self.contactUrl = "mailto:" + self.contactEmailAddress;

        self.pages = {
            start: "/index.html",
            searchResult: "/pages/searchResult.html",
            impressum: "/pages/impressum.html",
            termsOfUse: "/pages/termsOfUse.html",
        }

        self.demoWarning = {
            warningMessage: "SFSU/FAU/Fulda Software Engineering Project, Fall 2016. For Demonstration Only"
        };

        self.copyrightBar = {
            impressumUrl: self.pages.impressum,
            contactUrl: self.contactUrl,
            termsOfUseUrl: self.pages.termsOfUse,
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
    var pages = {
        '/': "app/pageModules/indexModule",
        '/index.html': "app/pageModules/indexModule",
        '/pages/searchResult.html': "app/pageModules/indexModule"
    }

    // Load Page Module
    var pageModulePath = pages[location.pathname];
    requirejs([pageModulePath], function(pageModule) {
        var appModel = new AppModel(ko);

        if (pageModule && pageModule.initialize) {
            pageModule.initialize(appModel);
        }

        ko.applyBindings(appModel);
    });
});


