requirejs(['jquery', 'bootstrap', 'knockout', 'app/components/todo/todo.component'], function($, bs, ko, todoComponent) {
    //bootstrap is always undefined
    //jquery and boostrap plugin will be loaded global
    ko.components.register("todo", todoComponent);
    ko.applyBindings();
    console.log("Loaded app");
});