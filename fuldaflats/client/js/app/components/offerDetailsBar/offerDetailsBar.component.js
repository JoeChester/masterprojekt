define(['text!./offerDetailsBar.component.html', 'text!./offerDetailsBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function OfferDetailsModel(params) {
            var self = this;
            // your model functions and variables                    
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new OfferDetailsModel(params);
                }
            },
            template: componentTemplate
        };
    });