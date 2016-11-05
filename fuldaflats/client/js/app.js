requirejs.config({
    baseUrl: 'js',
    map: {
    },
    shim: {
        "bootstrap": { "deps": ['jquery'] }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        knockout: '../bower_components/knockout/dist/knockout'
    }
});

requirejs(['app/main']);