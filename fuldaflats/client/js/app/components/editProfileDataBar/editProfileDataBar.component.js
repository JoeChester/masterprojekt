define(['text!./editProfileDataBar.component.html', 'css!./editProfileDataBar.component.css', 'knockout', 'jquery', 'moment'],
    function (componentTemplate, componentCss, ko, $, moment) {
         moment.locale('de');
        function EditProfileDataModel(params) {
            var self = this;
            self.currentUser = ko.observable();
            self.testBinding = ko.observable('myBinding');

            $.getJSON({
                url: '/api/users/me',
                success: function (data, status, req) {
                                        if(data.birthday){
                        data.birthday = moment(data.birthday).format('LL');
                    }
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