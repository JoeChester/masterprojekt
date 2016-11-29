define(['text!./searchBar.component.html', 'css!./searchBar.component.css', 'knockout', 'fuldaflatsApiClient'],
    function(componentTemplate, componentCss, ko, api) {

        var forceNullObservable = function(_val) {
            var obs = ko.observable(_val);

            return ko.computed({
                read: function() {
                    return obs();
                },
                write: function(val) {
                    if(val == '') {
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
            self.offerTypes = ko.observableArray(['FLAT', 'SHARE', 'SUBLET', 'COUCH', 'PARTY']);

            //Recursively crawl the last search query and set knockout observables in leaf nodes
            function createRecursiveNotNullObservable (object) {
                for(var c1 in object){
                    if(typeof object[c1] != "object"){
                        object[c1] = forceNullObservable(object[c1]);
                        continue;
                    }
                    object[c1] = createRecursiveNotNullObservable(object[c1]);
                }
                return object;
            }

            self.queryParameter = ko.observable({
                    offerType: forceNullObservable(),
                    uniDistance: { lte: forceNullObservable()},
                    rent: { lte: forceNullObservable()},
                    size: { gte: forceNullObservable()},
                    tag: forceNullObservable()
                });

            function getQueryParameter() {
                var queryParamaterEmpty = {
                    offerType: forceNullObservable(),
                    uniDistance: { lte: forceNullObservable()},
                    rent: { lte: forceNullObservable()},
                    size: { gte: forceNullObservable()},
                    tag: forceNullObservable()
                }

                $.ajax({
                    url: "/api/offers/search/last",
                    type: "get",
                    contentType: "application/json",
                    success: function(data, status, req){
                        console.log("LAST SEARCH");
                        console.log(JSON.stringify(data));
                        self.queryParameter(createRecursiveNotNullObservable(data));
                    },
                    error: function(req, status, err){
                        self.queryParameter(queryParamaterEmpty);
                    }
                });
            };

            getQueryParameter();

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
            self.showExtendedSearch = ko.observable();
            self.showExtendedSearch(false);
            self.showSimpleSearch = ko.observable();
            self.showSimpleSearch(true);

            //Check if I may show simple search
            self.checkLogin = function(){
            $.ajax({
                    url: "/api/users/me",
                    type: "get",
                    contentType: "application/json",
                    success: function(data, status, req){
                        self.showExtendedSearchButton(true);
                    },
                    error: function(req, status, err){
                        self.showExtendedSearchButton(false);
                    }
                });
            }
        
            self.checkLogin();
            loginCallbacks.push(self.checkLogin);

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