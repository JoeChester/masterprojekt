define(['text!./searchBar.component.html', 'text!./searchBar.component.css', 'knockout', 'fuldaflatsApiClient'],
    function (componentTemplate, componentCss, ko, api) {

        function SearchPanelModel(params) {
            var self = this;
            var searchCookieName = "lastSearchQuery";

            self.offerTypes = ko.observableArray();
            self.searchPageInfo = ko.observable();

            if (params) {
                self.searchPageInfo(ko.unwrap(params.searchPageInfo) || '');

                var paramsOfferTypes = ko.unwrap(params.offerTypes)
                if (paramsOfferTypes && paramsOfferTypes.length > 0) {
                    self.offerTypes(paramsOfferTypes);
                }
            }

            self.tags = ko.observableArray();

            api.offer.getTags().then(function (tags) {
                self.tags(ko.unwrap(tags));
            });

            function getQueryParameter() {
                var queryParamater = {
                    offerType: ko.observable(),
                    maxDistance: ko.observable(),
                    maxPrice: ko.observable(),
                    minAreaSize: ko.observable(),
                    tag: ko.observable()
                }

                var lastSearchQueryCookie = $.cookie("lastSearchQuery");
                if (lastSearchQueryCookie) {
                    try {
                        var lastSearchQuery = JSON.parse(lastSearchQueryCookie);
                        if (lastSearchQuery) {
                            $.each(lastSearchQuery, function (propertyName, propertyValue) {
                                if (queryParamater.hasOwnProperty(propertyName)) {
                                    queryParamater[propertyName](propertyValue);
                                }
                            });
                        }
                    } catch (exception) {
                        console.error("Could not parse latest search query");
                    }
                }

                return queryParamater;
            };

            self.queryParameter = getQueryParameter();

            self.search = function () {
                $.cookie(searchCookieName, ko.toJSON(self.queryParameter), { expires: 1, path: '/' });
                if (self.searchPageInfo() && self.searchPageInfo().url) {
                    window.document.location.href = self.searchPageInfo().url
                }
            };

            self.optionsAfterRender = function (option, item) {
                ko.applyBindingsToNode(option, {
                    disable: !item
                }, item);
            };
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    var viewModel = new SearchPanelModel(params);
                    return viewModel;
                }
            },
            template: componentTemplate
        };
    });