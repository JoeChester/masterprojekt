define(['text!./searchResultBar.component.html', 'css!./searchResultBar.component.css', 'knockout', 'jquery', 'fuldaflatsApiClient', 'leaflet'],
    function (componentTemplate, componentCss, ko, $, api, L) {
        function SearchResultModel() {
            var self = this;
            console.log(L);
            // your model functions and variables

            var resultMap;

            var forceNullObservable = function () {
                var obs = ko.observable();

                return ko.computed({
                    read: function () {
                        return obs();
                    },
                    write: function (val) {
                        if (val === '') {
                            val = null;
                        }
                        obs(val);
                    }
                });
            };

            self.offers = ko.observableArray([]),

            function search() {
                var searchQuery = ko.toJSON(model.queryParameter);
                console.log(searchQuery);
                $.ajax({
                    url: "/api/offers/search",
                    type: "post",
                    dataType: "application/json",
                    contentType: "application/json",
                    data: searchQuery,
                    success: function (data, status, req) {
                        getSearchResults();
                    },
                    error: function (req, status, err) {
                        console.log("Error!");
                        console.log(err);
                    }
                });
            }


            function getSearchResults() {
                self.offers.removeAll();
                $.ajax({
                    url: "/api/offers/search",
                    success: function (data, status, req) {
                        console.log(data);
                        for (var i in data) {
                            self.offers.push(data[i]);
                        }
                    },
                    error: function (req, status, err) {

                    }
                });
            }

            function setupMap() {
                resultMap = L.map('resultMap').setView([50.5647986, 9.6828528], 14);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    minZoom: 11,
                    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                }).addTo(resultMap);
            }

            $(function () {
                //setupMap();
                getSearchResults();
            });

        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var viewModel = new SearchResultModel(params);
                    return viewModel;
                }
            },
            template: componentTemplate
        };
    });