requirejs.config({
    baseUrl: location.pathname.startsWith("/pages/") === true ? '/../js' : "/js",
    map: {
    },
    shim: {
        'bootstrap': { 'deps': ['jquery'] },
        'jqueryCookie': { 'deps': ['jquery'] },
        'waypoints': { 'deps': ['jquery'] },
        'jqueryConterup': { 'deps': ['jquery'] },
        'jqueryParallax': { 'deps': ['jquery'] },
        'front': { 'deps': ['jquery'] },
        'owlCarousel': { 'deps': ['jquery'] },
        'knockoutOwlCarousel': { 'deps': ['knockout', 'jquery', 'owlCarousel'] },
        'fuldaflatsApiClient':  { 'deps': ['knockout', 'jquery'] },
    },
    paths: {
        css: '../bower_components/require-css/css',
        text: '../bower_components/text/text',
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        knockout: '../bower_components/knockout/dist/knockout',
        jqueryCookie: './lib/jquery.cookie',
        waypoints: './lib/waypoints.min',
        jqueryConterup: './lib/jquery.counterup.min',
        jqueryParallax: './lib/jquery.parallax-1.1.3',
        front: './lib/front',
        owlCarousel: './lib/owl.carousel.min',
        knockoutOwlCarousel: './lib/knockout-owlCarousel',
        fuldaflatsApiClient: './fuldaflatsApiClient/fuldaflatsApiClient'
    }
});

requirejs(['app/main']);