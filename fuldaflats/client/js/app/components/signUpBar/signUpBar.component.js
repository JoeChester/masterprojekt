define(['text!./signUpBar.component.html', 'text!./signUpBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        return {
            viewModel: function (params) {
                var self = this;

            },
            template: componentTemplate
        };
    });