define(['text!./searchResultBar.component.html', 'css!./searchResultBar.component.css', 'knockout', 'jquery', 'fuldaflatsApiClient', 'css!../offerBarSlider/offerBarSlider.component.css'],
    function (componentTemplate, componentCss, ko, $, api, offerBarCss) {
        function SearchResultModel() {
            var self = this;

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


            self.getSearchResults = function() {
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
                        console.log(status);
                        console.log(err);
                        console.log(req);
                    }
                });
            }

            searchCallback = self.getSearchResults;

            $(function () {
                self.getSearchResults();
                //initMap();
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