/************************************************************
 * File:            newOfferBar.component.js
 * Author:          Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for new offer bar.
 ************************************************************/
define(['text!./newOfferBar.component.html', 'css!./newOfferBar.component.css', 'knockout', 'jquery', 'fuldaflatsApiClient'],
    function(componentTemplate, componentCss, ko, $, api) {
        function NewOfferModel(ko, $, api) {
            var self = this;
            // your model functions and variables
            self.tabsContainer = ko.observable();
            self.offer = ko.observable({});
            self.currentUser = ko.observable(
                {
                    isAuthenticated: false,
                    userData: undefined
                }
            );

            function activateTabNav(navElement) {
                if (navElement && typeof navElement.attr === "function") {
                    var parentListElement = navElement.parent("li");
                    if (parentListElement.length > 0) {
                        parentListElement.removeClass("disabled");
                        navElement.attr("data-toggle", "tab");
                    }
                }
            };

            self.goNextStep = function(model, event) {
                if (self.tabsContainer() && event.currentTarget) {
                    var nextTabId = event.currentTarget.getAttribute("next-tab");
                    var nextTabNav = self.tabsContainer().find('.nav a[href="' + nextTabId + '"]');
                    if (nextTabNav.length > 0) {
                        nextTabNav.tab('show');
                        activateTabNav(nextTabNav);
                    }
                }
                // pre Validation
                // update offer
                // response validation / handling
                // go next or show error
                // when go next create browser history
                // return true -> next tab
            };

            self.cancelCreation = function() {
                window.history.back();
            };

            self.initialize = function(params, tabsContainer) {
                self.tabsContainer(tabsContainer || "");
            };
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var viewModel = null;

                    var templateRoot = $(componentInfo.element);
                    if (templateRoot.length > 0) {
                        var tabsContainer = templateRoot.find(".tabs");
                        if (tabsContainer.length > 0) {
                            var viewModel = new NewOfferModel(ko, $, api);
                            viewModel.initialize(params, tabsContainer);
                        }
                    }

                    return viewModel;
                }
            },
            template: componentTemplate
        };
    });