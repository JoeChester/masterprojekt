define(['text!./searchResultBar.component.html', 'css!./searchResultBar.component.css', 'knockout',
        'jquery', 'fuldaflatsApiClient', 'leaflet', 'css!/css/leaflet.css',
        'css!../offerBarSlider/offerBarSlider.component.css'
    ],
    function (componentTemplate, componentCss, ko, $, api, L, leafletCss, offerBarCss) {

        var resultMap;
        var locationMarkers = [];
        var iconBlue = L.icon({
            iconUrl: '/img/marker-icon-purple.png',
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -43],
        });

        var iconHS = L.icon({
            iconUrl: '/img/hs_marker.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -43],
        });

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


                self.getSearchResults = function () {
                    self.offers.removeAll();
                    //Remove all Markers from the map
                    for (var i in locationMarkers) {
                        resultMap.removeLayer(locationMarkers[i])
                    }

                    $.ajax({
                        url: "/api/offers/search",
                        success: function (data, status, req) {
                            console.log(data);
                            for (var i in data) {
                                self.offers.push(data[i]);
                            }
                            placeMarkers(data);
                        },
                        error: function (req, status, err) {
                            console.log(status);
                            console.log(err);
                            console.log(req);
                        }
                    });
                }

            searchCallback = self.getSearchResults;

            function initMap() {
                resultMap = L.map('resultMap').setView([50.5647986, 9.6828528], 14);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 2,
                    minZoom: 1,
                    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                }).addTo(resultMap);

                var hs_latlng = ['50.5648258', '9.6842798'];
                var popup = '<div class="marker-popup"><img src="/img/logo_hs.png" alt="" class="img-responsive"></div>'
                L.marker(hs_latlng, {icon: iconHS}).addTo(resultMap).bindPopup(popup);

            }

            function placeMarkers(offers) {
                for (var i in offers) {
                    var latlng = [offers[i].latitude, offers[i].longitude];
                    var iconPopup = iconBlue;
                    var pictureUrl = offers[i].mediaObjects[0].thumbnailUrl || "/uploads/sampleB.jpg";
                    pictureUrl = "/" + pictureUrl;


                    var picture = '<div class="box-image-text">' +
                        '<div class="top">' +
                        '<div class="image">' +
                        '<img src="' + pictureUrl + '" alt="" class="img-responsive">' +
                        '</div>' +
                        '<div class="bg"></div>' +
                        '<div class="text map-popup-viewtext">' +
                        '<p class="buttons">' +
                        '<a href="/pages/offerDetails.html?offerId=' + offers[i].id + 
                        '" class="btn btn-template-transparent-primary map-popup-img"><i class="fa fa-link"></i>View Details</a>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    var caption = '<h4>' + offers[i].title + '</h4>';
                    var size = '<div class="map-popup-details col-md-6">' +
                        '<div class="offer-brief-detail-1-details-value"><strong>' + offers[i].size + ' m²</strong></div>' +
                        '<div class="offer-brief-detail-1-details-key"><small>Size</small></div></div>';
                    var price = '<div class="map-popup-details col-md-6">' +
                        '<div class="offer-brief-detail-1-details-value price-wrapper"><strong>' + offers[i].rent + ' €</strong>' +
                        '<div class="rate"><strong>/ ' + offers[i].rentType + '</strong></div></div>' +
                        '<div class="offer-brief-detail-1-details-key"><small>' + offers[i].offerType + '</small></div>';
                    var popup = '<div class="marker-popup row">' +
                        caption +
                        picture +
                        size +
                        price +
                        '</div>';
                    locationMarkers.push(L.marker(latlng, {
                        icon: iconPopup
                    }).addTo(resultMap).bindPopup(popup));
                }
            }

            $(function () {
                self.getSearchResults();
                initMap();
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