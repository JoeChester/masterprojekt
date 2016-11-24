define(['text!./becomeLandlordBar.component.html', 'text!./becomeLandlordBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function BecomeLandlordModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new BecomeLandlordModel(params);
                }
            },
            template: componentTemplate
        };
    });