define(['text!./navigationBar.component.html', 'text!./navigationBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function NavigationModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new NavigationModel(params);
                }
            },
            template: componentTemplate
        };
    });