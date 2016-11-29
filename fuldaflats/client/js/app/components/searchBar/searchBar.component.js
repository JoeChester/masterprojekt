define(['text!./searchBar.component.html', 'css!./searchBar.component.css', 'knockout', 'fuldaflatsApiClient'],
    function(componentTemplate, componentCss, ko, api) {


        var forceNullObservable = function() {
            var obs = ko.observable();

            return ko.computed({
                read: function() {
                    return obs();
                },
                write: function(val) {
                    if(val === '') {
                        val = null;
                    }
                    obs(val);
                }
            });
        };

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

            api.offers.getTags().then(function(tags) {
                self.tags(ko.unwrap(tags));
            });

            self.availableTags = ko.observableArray(['computer science', 'economics']),
            self.offerTypes = ko.observableArray(['FLAT', 'SHARE', 'SUBLET', 'COUCH', 'PARTY']),
            self.queryParameter = {
                offerType: forceNullObservable(),
                uniDistance: { lte: forceNullObservable()},
                rent: { lte: forceNullObservable()},
                size: { gte: forceNullObservable()},
                tag: forceNullObservable()
            }

            function getQueryParameter() {
                var queryParamater = {
                    offerType: forceNullObservable(),
                    uniDistance: { lte: forceNullObservable()},
                    rent: { lte: forceNullObservable()},
                    size: { gte: forceNullObservable()},
                    tag: forceNullObservable()
                }

                var lastSearchQueryCookie = $.cookie("lastSearchQuery");
                if (lastSearchQueryCookie) {
                    try {
                        var lastSearchQuery = JSON.parse(lastSearchQueryCookie);
                        if (lastSearchQuery) {
                            $.each(lastSearchQuery, function(propertyName, propertyValue) {
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

            if(isIndex){
                searchCallback = function(){
                    $.cookie(searchCookieName, ko.toJSON(self.queryParameter), { expires: 1, path: '/' });
                        if (self.searchPageInfo() && self.searchPageInfo().url) {
                            window.document.location.href = self.searchPageInfo().url
                        }
                }
            }

            // Function Bindings
            self.search = function() {
                var searchQuery = ko.toJSON(self.queryParameter);
                console.log(searchQuery);
                $.ajax({
                    url: "/api/offers/search",
                    type: "post",
                    dataType: "application/json",
                    contentType: "application/json",
                    data: searchQuery,
                    success: function(data, status, req){
                        searchCallback();
                    },
                    error: function(req, status, err){
                        console.log("Error!");
                        console.log(err);
                    }
                });
            };

            //Extended Search Bar
            self.showExtendedSearchButton = ko.observable();
            self.showExtendedSearchButton(false || !isIndex);
            self.showExtendedSearch = ko.observable();
            self.showExtendedSearch(false);
            self.showSimpleSearch = ko.observable();
            self.showSimpleSearch(true);

            self.openExtendedSearch = function(){
                self.showExtendedSearch(true);
                self.showSimpleSearch(false);
            }
            self.hideExtendedSearch = function(){
                self.showExtendedSearch(false);
                self.showSimpleSearch(true);
            }

            self.optionsAfterRender = function(option, item) {
                ko.applyBindingsToNode(option, {
                    disable: !item
                }, item);
            };
        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var viewModel = new SearchPanelModel(params);
                    return viewModel;
                }
            },
            template: componentTemplate
        };
    });