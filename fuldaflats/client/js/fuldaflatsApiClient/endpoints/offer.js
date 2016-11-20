define(["jquery", 'knockout'], function ($, ko) {

    function OfferEndpoint(offerEndpointUrls) {
        var self = this;
        var endpointUrls = offerEndpointUrls;
        var cachedTags = ko.observableArray();

        self.getTags = function (force) {
            var defer = $.Deferred();

            if (force || cachedTags().length == 0) {
                $.ajax({
                    url: endpointUrls.tags,
                    method: "Get",
                    dataType: "json"
                }).done(function (tags) {
                    if (tags && tags.length > 0) {
                        cachedTags(tags);
                    }

                    defer.resolve(cachedTags);

                }).fail(function (jqXHR, textStatus) {
                    var errorMsg = "Failed to load tags \n" + jqXHR.statusCode().status + ": " + jqXHR.statusCode().statusText;
                    console.error(errorMsg);
                    //defer.reject(errorMsg) // Demo Test
                    cachedTags(["AI", "ET", "OE"]);
                    defer.resolve(cachedTags);
                });
            } else {
                defer.resolve(cachedTags);
            }

            return defer.promise();
        }
    }

    return OfferEndpoint;
});