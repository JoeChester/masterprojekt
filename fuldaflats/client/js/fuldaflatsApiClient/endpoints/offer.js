define(["jquery", 'knockout'], function($, ko) {

    function OfferEndpoint(offerEndpointUrls) {
        var self = this;
        var endpointUrls = offerEndpointUrls;

        var getTagsDefer = undefined;
        var cachedTags = ko.observableArray();

        self.getTags = function(force) {
            if (getTagsDefer == undefined) {
                getTagsDefer = $.Deferred();

                if (force || cachedTags().length == 0) {
                    $.ajax({
                        url: endpointUrls.tags,
                        method: "Get",
                        dataType: "json"
                    }).done(function(tags) {
                        if (tags && tags.length > 0) {
                            cachedTags(tags);
                        }

                        getTagsDefer.resolve(cachedTags);
                        getTagsDefer = undefined;
                    }).fail(function(jqXHR, textStatus) {
                        var errorMsg = "Failed to load tags \n" + jqXHR.statusCode().status + ": " + jqXHR.statusCode().statusText;
                        console.error(errorMsg);
                        //defer.reject(errorMsg) // Demo Test
                        cachedTags(
                            [
                                {
                                    "tag_id": 1,
                                    "title": "Angewandte Informatik",
                                    "category": "faculty",
                                    "offers": null
                                },
                                {
                                    "tag_id": 2,
                                    "title": "Wirtschaftswissenschaften",
                                    "category": "faculty",
                                    "offers": null
                                },
                                {
                                    "tag_id": 3,
                                    "title": "Deutsch",
                                    "category": "language",
                                    "offers": null
                                }, {
                                    "tag_id": 3,
                                    "title": "Deutsch",
                                    "category": "language",
                                    "offers": null
                                }, {
                                    "tag_id": 1,
                                    "title": "Angewandte Informatik",
                                    "category": "faculty",
                                    "offers": null
                                },
                                {
                                    "tag_id": 2,
                                    "title": "Wirtschaftswissenschaften",
                                    "category": "faculty",
                                    "offers": null
                                },
                                {
                                    "tag_id": 3,
                                    "title": "Deutsch",
                                    "category": "language",
                                    "offers": null
                                }, {
                                    "tag_id": 3,
                                    "title": "Deutsch",
                                    "category": "language",
                                    "offers": null
                                }
                            ]);
                        getTagsDefer.resolve(cachedTags);
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