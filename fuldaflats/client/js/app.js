var loginCallbacks = [];
function executeLoginCallbacks(){
    for(var i in loginCallbacks){
        loginCallbacks[i]();
    }
};

requirejs.config({
    baseUrl: location.pathname.indexOf("/pages/") === 0 ? '/../js' : "/js",
    map: {
    },
    shim: {
        leaflet: {
            exports: 'L'
        },
        'bootstrap': { 'deps': ['jquery'] },
        'jqueryCookie': { 'deps': ['jquery'] },
        'waypoints': { 'deps': ['jquery'] },
        'jqueryConterup': { 'deps': ['jquery'] },
        'jqueryParallax': { 'deps': ['jquery'] },
        //'front': { 'deps': ['jquery'] },
        'owlCarousel': { 'deps': ['jquery'] },
        'knockoutOwlCarousel': { 'deps': ['knockout', 'jquery', 'owlCarousel'] },
        'fuldaflatsApiClient': { 'deps': ['knockout', 'jquery'] },
        'jqcloud': { 'deps': ['jquery'] },
        'bootstrapSwitch': { 'deps': ['jquery'] },
    },
    paths: {
        css: '../bower_components/require-css/css.min',
        text: '../bower_components/text/text',
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        knockout: '../bower_components/knockout/dist/knockout',
        jqueryCookie: './lib/jquery.cookie',
        waypoints: './lib/waypoints.min',
        jqueryConterup: './lib/jquery.counterup.min',
        jqueryParallax: './lib/jquery.parallax-1.1.3',
        //front: './lib/front',
        bootstrapSwitch: '../bower_components/bootstrap-switch/dist/js/bootstrap-switch.min',
        owlCarousel: './lib/owl.carousel.min',
        knockoutOwlCarousel: './lib/knockout-owlCarousel',
        jqcloud: '/bower_components/jqcloud2/dist/jqcloud.min',
        fuldaflatsApiClient: './fuldaflatsApiClient/fuldaflatsApiClient',
        leaflet: './lib/leaflet'
    }
});

/*
window.onerror = function(messageOrEvent, source, lineno, colno, error) {
    document.location.href = "/pages/error.html"
};*/

//Load default libraries, plugins and initilize app
requirejs(['app/appModel',
    'jquery', 'bootstrap', 'knockout', 'jqueryCookie', 'waypoints', 'jqueryConterup', 'leaflet',
    'jqueryParallax', /* 'front', */ 'bootstrapSwitch', 'owlCarousel', 'knockoutOwlCarousel', 'jqcloud', 'fuldaflatsApiClient'
], function(app, $) {
    var event = new CustomEvent('scripts-loaded');
    document.dispatchEvent(event);
    console.log("Loaded default libraries, plugins and initilized app.");

    app.initialize();
});