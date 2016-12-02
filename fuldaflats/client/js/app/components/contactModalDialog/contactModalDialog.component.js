define(['text!./contactModalDialog.component.html', 'css!./contactModalDialog.component.css', 'knockout', 'jquery', 'leaflet'],
    function (componentTemplate, componentCss, ko, $, L) {
        function ContactInModel($, ko, L) {
            var self = this;
            var contactMap = ko.observable();
            var dialogContainer = ko.observable();

            function initMap() {
                var iconHS = L.icon({
                    iconUrl: '/img/hs_marker.png',
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -43],
                });

                contactMap(L.map('contactMap').setView([50.5647986, 9.6828528], 12));

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                }).addTo(contactMap());

                var hs_latlng = ['50.5648258', '9.6842798'];
                var popup = '<div class="marker-popup"><img src="/img/logo_hs.png" alt="" class="img-responsive"></div>'
                L.marker(hs_latlng, { icon: iconHS }).addTo(contactMap()).bindPopup(popup);


            }

            self.initialize = function (params, dialogContainerElement) {
                if (dialogContainerElement) {
                    dialogContainer(dialogContainerElement);

                    $(dialogContainer).on('shown.bs.modal', function () {
                        initMap();
                    });
                }
            };
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var viewModel = null;

                    var templateRoot = $(componentInfo.element);
                    if (templateRoot.length > 0) {
                        var contactDialog = templateRoot.find("#contactModalDialog");
                        if (contactDialog.length > 0) {
                            var contact = new ContactInModel($, ko, L);
                            contact.initialize(params, contactDialog);
                        }
                    }

                    return contact;
                }
            },
            template: componentTemplate
        };
    });