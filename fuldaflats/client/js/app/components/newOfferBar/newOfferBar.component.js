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

            function pushTabToHistory(pTabId, doReplaceState) {
                if (pTabId) {
                    if (doReplaceState) {
                        window.history.replaceState({
                            tabId: pTabId.toString()
                        }, "", window.location.href);
                    } else {
                        window.history.pushState({
                            tabId: pTabId.toString()
                        }, "", window.location.href);
                    }
                }
            };

            function addActiveTabToHistory(doRplaceState) {
                if (self.tabsContainer()) {
                    var activeTabNavLink = self.tabsContainer().find('.nav .active a');
                    if (activeTabNavLink.length > 0) {
                        var tabId = activeTabNavLink[0].getAttribute("href").toString();
                        if (tabId) {
                            pushTabToHistory(tabId, doReplaceState);
                        }
                    }
                }
            };

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
                        addActiveTabToHistory();
                    }
                }
                // pre Validation
                // update offer
                // response validation / handling
                // go next or show error
                // when go next create browser history
                // return true -> next tab
            };

            window.addEventListener("popstate", function(e) {
                if (e.state) {
                    var tabId = e.state.tabId;
                    if (tabId) {
                        var nextTabNav = self.tabsContainer().find('.nav a[href = "' + tabId + '"]');
                        if (nextTabNav.length > 0) {
                            nextTabNav.tab('show');
                        }
                    }
                }
            });

            self.goPrevStep = function(model, event) {
                window.history.back();
            };

            self.cancelCreation = function() {
                window.history.back();
            };

            self.initialize = function(params, tabsContainer) {
                self.tabsContainer(tabsContainer || "");
                addActiveTabToHistory(true);
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