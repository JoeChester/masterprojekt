define(['text!./editOfferDetailsBar.component.html', 'text!./editOfferDetailsBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function EditOfferDetailsModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new EditOfferDetailsModel(params);
                }
            },
            template: componentTemplate
        };
    });