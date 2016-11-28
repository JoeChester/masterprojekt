define(['text!./editProfileDataBar.component.html', 'css!./editProfileDataBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        function EditProfileDataModel(params) {
            var self = this;
            self.currentUser = ko.observable();
            self.testBinding = ko.observable('myBinding');

            self.genders =  ko.observableArray(['female', 'male']);

            $.getJSON({
                url: '/api/users/me',
                success: function (data, status, req) {
                    console.log(data);
                    self.currentUser(data);
                }
            });

            self.showTab = function (scope, event) {
                event.preventDefault()
                $(event.currentTarget).tab('show')
            }
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new EditProfileDataModel(params);
                }
            },
            template: componentTemplate
        };
    });