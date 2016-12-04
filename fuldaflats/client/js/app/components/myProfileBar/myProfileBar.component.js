/************************************************************
 * File:            myProfileBar.component.js
 * Author:          Michelle Rothenbuecher, Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for my profile bar.
 ************************************************************/
define(['text!./myProfileBar.component.html', 'css!./myProfileBar.component.css', 'knockout', 'jquery', 'moment'],
    function (componentTemplate, componentCss, ko, $, moment) {

        moment.locale('de');

        function MyProfileModel(params) {
            var self = this;
            // your model functions and variables
            self.currentUser = ko.observable();

            function removeFavorite(offerId) {
                console.log("Remove Favorite: " + offerId);
            }

            self.getUserdata = function () {
                $.getJSON({
                    url: '/api/users/me',
                    success: function (data, status, req) {
                        if (data.birthday) {
                            data.birthday = moment(data.birthday).format('LL');
                        }
                        if (data.favorites) {
                            if (data.favorites.length > 0) {
                                for (var i in data.favorites) {
                                    data.favorites[i].detailsUrl = '/pages/offerDetails?offerId=' + data.favorites[i].id;
                                    data.favorites[i].creationDateFormat = moment(data.favorites[i].creationDate).format('L');
                                    data.favorites[i].removeFavorite = function () {
                                        removeFavorite(this.id);
                                    }
                                }
                            }
                        }
                        if (data.offers) {
                            for (var i in data.offers) {
                                data.offers[i].detailsUrl = '/pages/offerDetails?offerId=' + data.offers[i].id;
                                data.offers[i].editDetailsUrl = '/pages/editOfferDetails?offerId=' + data.offers[i].id;
                                data.offers[i].creationDateFormat = moment(data.offers[i].creationDate).format('L');
                            }
                        }

                        console.log(data);
                        self.currentUser(data);
                    }
                });
            }

            self.getUserdata();

            self.showTab = function (scope, event) {
                event.preventDefault()
                console.log(event);
                $(event.currentTarget).tab('show')
            }

        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    return new MyProfileModel(params);
                }
            },
            template: componentTemplate
        };
    });