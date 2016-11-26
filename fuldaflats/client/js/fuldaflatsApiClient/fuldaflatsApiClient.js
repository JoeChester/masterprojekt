define(["jquery", 'knockout', "/js/fuldaflatsApiClient/endpoints/offers.js", "/js/fuldaflatsApiClient/endpoints/users.js"], function($, ko, offersEndPoint, usersEndPoint) {
    function FuldaFlatsApiClient() {
        var self = this;

        var relativeUrl = "/api/"
        var endpointUrls = {
            offers: {
                tags: relativeUrl + "tags",
                search: relativeUrl + "offers/search",
                recent: relativeUrl + "offers/recent",
            },
            users: {
                auth: relativeUrl + "users/auth",
                users: relativeUrl + "users",
                me: relativeUrl + "users/me",
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

        self.initialize = function(relativeApiUrl, offerTypes) {
            setRelativeApiUrl(relativeApiUrl);

            self.offers = new offersEndPoint(endpointUrls.offers, offerTypes);
            self.users = new usersEndPoint(endpointUrls.users);
        }
    }

    return new FuldaFlatsApiClient;
});