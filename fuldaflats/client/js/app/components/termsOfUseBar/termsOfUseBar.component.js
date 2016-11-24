define(['text!./termsOfUseBar.component.html', 'text!./termsOfUseBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        function TermsOfUseModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new TermsOfUseModel(params);
                }
            },
            template: componentTemplate
        };
    });