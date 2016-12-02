/************************************************************
 * File:            editProfileDataBar.component.js
 * Author:          Michelle Rothenbuecher, Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for edit profile data bar.
 ************************************************************/
define(['text!./editProfileDataBar.component.html', 'css!./editProfileDataBar.component.css', 'knockout', 'jquery', 'moment'],
    function (componentTemplate, componentCss, ko, $, moment) {
         moment.locale('de');
        function EditProfileDataModel(params) {
            var self = this;
            self.currentUser = ko.observable();
            self.userChanges = ko.observable({});
            self.testBinding = ko.observable('myBinding');

            $.getJSON({
                url: '/api/users/me',
                success: function (data, status, req) {
                                        if(data.birthday){
                        data.birthday = moment(data.birthday).format('L');
                    }
                    self.currentUser(data);
                }
            });

            self.showTab = function (scope, event) {
                event.preventDefault()
                $(event.currentTarget).tab('show')
            }

                self.accept = function(){
                    self.userChanges().gender = self.currentUser().gender;
                    var _userChanges = ko.toJSON(self.userChanges);

                    $.ajax({
                        method: "PUT",
                        url: "/api/users/me",
                        dataType: "application/json",
                        contentType: "application/json",
                        data: _userChanges,
                        success: function(data, status, req){
                            window.location = "/pages/myProfile";
                        },
                        error: function(req, status, error){
                            if(req.status == 200){
                                window.location = "/pages/myProfile";
                                return;
                            }
                            errorCallback(error);
                        }
                    });
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