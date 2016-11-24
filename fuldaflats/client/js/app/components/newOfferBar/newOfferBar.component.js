define(['text!./newOfferBar.component.html', 'text!./newOfferBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        return {
            viewModel: function (params) {
                var self = this;

            },
            template: componentTemplate
        };
    });