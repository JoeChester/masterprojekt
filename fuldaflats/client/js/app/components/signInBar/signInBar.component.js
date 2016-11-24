define(['text!./signInBar.component.html', 'text!./signInBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        return {
            viewModel: function (params) {
                var self = this;

            },
            template: componentTemplate
        };
    });