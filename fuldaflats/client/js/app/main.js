requirejs(['jquery', 'bootstrap', 'knockout', 'app/modules/todoController'], function($, bs, ko, todoController) {
    //bootstrap is always undefined
    //jquery and boostrap plugin will be loaded global
    console.log("Loaded app");
    ko.applyBindings(new todoController());
});