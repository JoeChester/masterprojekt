requirejs.config({
    baseUrl: 'js',
    map: {
    },
    shim: {
        "bootstrap": { "deps": ['jquery'] }
    },
    paths: {
        css:  '../bower_components/require-css/css',
        text: '../bower_components/text/text',
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        knockout: '../bower_components/knockout/dist/knockout'
    }
});

requirejs(['app/main']);