define(['text!./editProfilePictureBar.component.html', 'css!./editProfilePictureBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function EditProfilePictureModel(params) {
            var self = this;
            // your model functions and variables
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new EditProfilePictureModel(params);
                }
            },
            template: componentTemplate
        };
    });