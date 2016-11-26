define(["jquery", 'knockout', "/js/fuldaflatsApiClient/endpoints/offer.js"], function ($, ko, offerEndPoint) {
    function FuldaFlatsApiClient() {
        var self = this;

        var relativeUrl = "/api/"
        var endpointUrls = {
            offer: {
                tags: relativeUrl + "tags",
                search: relativeUrl + "offers/search"
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

            self.offer = new offerEndPoint(endpointUrls.offer, offerTypes);
        }
    }

    return new FuldaFlatsApiClient;
});