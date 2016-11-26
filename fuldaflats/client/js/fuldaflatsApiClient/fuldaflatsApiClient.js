define(["jquery", 'knockout', "/js/fuldaflatsApiClient/endpoints/offer.js"], function ($, ko, offerEndPoint) {
    function FuldaFlatsApiClient() {
        var self = this;

        var relativeUrl = "/api/"
        var endpointUrls = {
            offers: {
                tags: relativeUrl + "tags",
                search: relativeUrl + "offers/search",
                recent: relativeUrl + "offers/recent",
            }
        }

        function setRelativeApiUrl(relativeApiUrl) {
            var unwrapRelativeApiUrl = ko.unwrap(relativeApiUrl);
            if (unwrapRelativeApiUrl) {
                if (unwrapRelativeApiUrl.indexOf("/") !== 0) {
                    unwrapRelativeApiUrl = "/" + unwrapRelativeApiUrl;
                }

                if (unwrapRelativeApiUrl.lastIndexOf("/") !== unwrapRelativeApiUrl.lenght - 1) {
                    unwrapRelativeApiUrl = unwrapRelativeApiUrl + "/";
                }

                relativeUrl = unwrapRelativeApiUrl;
            }
        }

        self.initialize = function (relativeApiUrl, offerTypes) {
            setRelativeApiUrl(relativeApiUrl);

            self.offers = new offerEndPoint(endpointUrls.offers, offerTypes);
        }
    }

    return new FuldaFlatsApiClient;
});