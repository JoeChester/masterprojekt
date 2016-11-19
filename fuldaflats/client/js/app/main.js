requirejs(['jquery', 'bootstrap', 'knockout', 'jqueryCookie', 'waypoints', 'jqueryConterup', 'jqueryParallax', 'front', 'owlCarousel'], function() {
    console.log("Loaded Scripts");
});


function appModel() {
    var self = this;
    self.domain = "FuldaFlats.de"
    self.copyrightBar = {
        impressumUrl: "/Impressum.html",
        contactUrl: "mailto:contact@fuldaflats.de",
        termsOfUseUrl: "/TermsOfUse.html",
        copyrightDate: "2016",
        copyrightName: self.domain,
        templateAuthorName: "Bootstrapious",
        templateUrl: "https://bootstrapious.com/free-templates"
    }
}

requirejs(['jquery', 'knockout',
    'app/components/demoWarningBar/demoWarningBar.component',
    'app/components/navigationBar/navigationBar.component',
    'app/components/copyrightBar/copyrightBar.component'],
    function($, ko, demoWarningBarComponent, navigationBarComponent, copyrightBarComponent) {
        ko.components.register("demo-warning", demoWarningBarComponent);
        ko.components.register("navigation", navigationBarComponent);
        ko.components.register("copyright", copyrightBarComponent);

        ko.applyBindings(new appModel());
        console.log("Loaded app");
    });