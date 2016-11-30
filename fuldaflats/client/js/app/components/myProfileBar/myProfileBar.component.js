define(['text!./myProfileBar.component.html', 'css!./myProfileBar.component.css', 'knockout', 'jquery', 'moment'],
    function(componentTemplate, componentCss, ko, $, moment) {
        
        moment.locale('de');

        function MyProfileModel(params) {
            var self = this;
            // your model functions and variables
            self.currentUser = ko.observable();
            self.testBinding = ko.observable('myBinding');

            $.getJSON({ 
                url: '/api/users/me', 
                success: function(data, status, req){
                    if(data.birthday){
                        data.birthday = moment(data.birthday).format('LL');
                    }
                    self.currentUser(data);
                }
            });

            self.showTab = function(scope, event) {
                event.preventDefault()
                console.log(event);
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