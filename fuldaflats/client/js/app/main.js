requirejs(['jquery', 'bootstrap', 'knockout', 'app/components/todo/todo.component', 'jqueryCookie', 'waypoints', 'jqueryConterup', 'jqueryParallax', 'front', 'owlCarousel'], function($, bs, ko, todoComponent) {
    //bootstrap, and some jquery modules are always undefined and will be loaded als jquery plugin
    //jquery and boostrap plugin will be loaded global
    ko.components.register("todo", todoComponent);
    ko.applyBindings();
    console.log("Loaded app");
});