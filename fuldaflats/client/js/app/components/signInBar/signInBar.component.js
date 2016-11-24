define(['text!./signInBar.component.html', 'css!./signInBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        function SignInModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new SignInModel(params);
                }
            },
            template: componentTemplate
        };
    });