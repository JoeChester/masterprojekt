define(["jquery", 'knockout'], function ($, ko) {

    function OfferEndpoint(offerEndpointUrls, offerTypes) {
        var self = this;
        var endpointUrls = offerEndpointUrls;

        var offerTypes = ko.observableArray([]);
        var unwrapOfferTypes = ko.unwrap(offerTypes);
        if (unwrapOfferTypes && unwrapOfferTypes.length > 0) {
            offerTypes(unwrapOfferTypes);
        }
        
        self.getOfferTypes = function () {
            var defer = $.Deferred();
            defer.resolve(offerTypes);
            return defer.promise();
        }

        var getTagsDefer = undefined;
        var cachedTags = ko.observableArray();

        self.getTags = function (force) {
            if (getTagsDefer == undefined) {
                getTagsDefer = $.Deferred();

                if (force || cachedTags().length == 0) {
                    $.ajax({
                        url: endpointUrls.tags,
                        method: "Get",
                        dataType: "json"
                    }).done(function (tags) {
                        if (tags && tags.length > 0) {
                            cachedTags(tags);
                        }

                        getTagsDefer.resolve(cachedTags);
                        getTagsDefer = undefined;
                    }).fail(function (jqXHR, textStatus) {
                        var errorMsg = "Failed to load tags \n" + jqXHR.statusCode().status + ": " + jqXHR.statusCode().statusText;
                        console.error(errorMsg);
                        defer.reject(errorMsg)
                        getTagsDefer = undefined;
                    });
                } else {
                    getTagsDefer.resolve(cachedTags);
                }
            }

            return getTagsDefer.promise();
        }
    }

    return OfferEndpoint;
});