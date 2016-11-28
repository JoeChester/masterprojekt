define(['text!./myProfileBar.component.html', 'css!./myProfileBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function MyProfileModel(params) {
            var self = this;
            // your model functions and variables

            self.currentUser = ko.observable();
            self.testBinding = ko.observable('myBinding');

            $.getJSON({ 
                url: '/api/users/me', 
                success: function(data, status, req){
                    console.log(data);
                    self.currentUser(data);
                }
            });

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