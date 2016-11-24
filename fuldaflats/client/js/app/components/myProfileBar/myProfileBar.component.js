define(['text!./myProfileBar.component.html', 'text!./myProfileBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        return {
            viewModel: function (params) {
                var self = this;

            },
            template: componentTemplate
        };
    });