define(['text!./myProfileBar.component.html', 'text!./myProfileBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function MyProfileModel(params) {
            var self = this;
            // your model functions and variables

            self.showTab = function(scope, event) {
                event.preventDefault()
                $(event.currentTarget).tab('show')
            }
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    return new MyProfileModel(params);
                }
            },
            template: componentTemplate
        };
    });