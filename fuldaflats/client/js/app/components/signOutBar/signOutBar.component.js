define(['text!./signOutBar.component.html', 'css!./signOutBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function SignOutModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new SignOutModel(params);
                }
            },
            template: componentTemplate
        };
    });