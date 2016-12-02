/************************************************************
 * File:            becomeLandlordBar.component.js
 * Author:          Michelle Rothenbuecher, Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for become landlord bar.
 ************************************************************/
define(['text!./becomeLandlordBar.component.html', 'css!./becomeLandlordBar.component.css', 'knockout', 'jquery', 'moment'],
    function (componentTemplate, componentCss, ko, $, moment) {
        function BecomeLandlordModel(params) {
             moment.locale('de');
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

            self.upgrade = function(){
                var _userChanges = JSON.parse(ko.toJSON(self.userChanges));
                _userChanges.gender = $("#gender").val();
                console.log(_userChanges);
            }
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new BecomeLandlordModel(params);
                }
            },
            template: componentTemplate
        };
    });