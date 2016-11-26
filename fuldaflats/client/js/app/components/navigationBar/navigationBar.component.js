define(['text!./navigationBar.component.html', 'css!./navigationBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        function NavigationModel($, ko) {
            var self = this;
            
            self.userTypes = {
                normal: 1,
                landlord: 2,
            }

            self.domain = ko.observable();
            self.logoUrl = ko.observable();

            self.homePageInfo = ko.observable();
            self.myProfilePageInfo = ko.observable();
            self.becomeLandlordPageInfo = ko.observable();
            self.newOfferPageInfo = ko.observable();
            self.impressumPageInfo = ko.observable();
            self.contactPageInfo = ko.observable();
            self.termsOfUsePageInfo = ko.observable();

            self.currentUser = ko.observable({
                isAuthenticated: false,
                userData: undefined
            });


            self.signOut = function () {

            }

            self.initialize = function (params) {
                if (params) {
                    self.domain(ko.unwrap(params.domain) || '');
                    self.logoUrl(ko.unwrap(params.logoUrl) || '');

                    self.homePageInfo(ko.unwrap(params.homePageInfo) || '');
                    self.myProfilePageInfo(ko.unwrap(params.myProfilePageInfo) || '');
                    self.becomeLandlordPageInfo(ko.unwrap(params.becomeLandlordPageInfo) || '');
                    self.newOfferPageInfo(ko.unwrap(params.newOfferPageInfo) || '');
                    self.impressumPageInfo(ko.unwrap(params.impressumPageInfo) || '');
                    self.contactPageInfo(ko.unwrap(params.contactPageInfo) || '');
                    self.termsOfUsePageInfo(ko.unwrap(params.termsOfUsePageInfo) || '');

                    if (params.currentUser && ko.isObservable(params.currentUser)) {
                        self.currentUser = params.currentUser;
                    }
                }
            };
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var navigation = new NavigationModel($, ko);
                    navigation.initialize(params);
                    return navigation;
                }
            },
            template: componentTemplate
        };
    });