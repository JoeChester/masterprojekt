define(["jquery", 'knockout', "./js/fuldaflatsApiClient/endpoints/offer.js"], function ($, ko, offerEndPoint) {
    function FuldaflatsApiClient() {
        var self = this;

        var relativeUrl = "/api/"
        var endpointUrls = {
            offer: {
                tags: relativeUrl + "tags"
            }
        }

        var cachedTags = ko.observableArray();

        self.offer = new offerEndPoint(endpointUrls.offer);
    }

    return new FuldaflatsApiClient;
});