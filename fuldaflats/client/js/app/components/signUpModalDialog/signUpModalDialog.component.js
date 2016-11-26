define(['text!./signUpModalDialog.component.html', 'css!./signUpModalDialog.component.css', 'knockout', 'jquery', 'fuldaflatsApiClient'],
    function(componentTemplate, componentCss, ko, $, api) {
        function SignUpModel(ko, $, api) {
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