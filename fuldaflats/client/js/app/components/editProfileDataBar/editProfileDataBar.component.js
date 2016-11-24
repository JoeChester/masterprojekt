define(['text!./editProfileDataBar.component.html', 'text!./editProfileDataBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function EditProfileDataModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new EditProfileDataModel(params);
                }
            },
            template: componentTemplate
        };
    });