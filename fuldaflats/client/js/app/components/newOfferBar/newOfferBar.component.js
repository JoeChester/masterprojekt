define(['text!./newOfferBar.component.html', 'css!./newOfferBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function NewOfferModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new NewOfferModel(params);
                }
            },
            template: componentTemplate
        };
    });