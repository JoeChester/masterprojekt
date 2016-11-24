define(['text!./signUpBar.component.html', 'css!./signUpBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function SignUpModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new SignUpModel(params);
                }
            },
            template: componentTemplate
        };
    });