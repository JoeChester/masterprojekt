define(["jquery", 'knockout'], function($, ko) {

    function OffersEndpoint(offersEndpointUrls, offerTypes) {
        var self = this;
        var endpointUrls = offersEndpointUrls;

        // Offer Serach

        var forceNullObservable = function() {
            var obs = ko.observable(null);
            return ko.pureComputed({
                read: function() {
                    return obs();
                },
                write: function(value) {
                    if (value === '') {
                        value = null;
                    }
                    obs(value);
                },
                owner: this
            });
        };

        self.getSearchQueryParamters = function() {
            return {
                offerType: forceNullObservable(),
                uniDistance: { lte: forceNullObservable() },
                rent: { lte: forceNullObservable() },
                size: { gte: forceNullObservable() },
                tag: forceNullObservable()
            }
        }

        self.searchOffer = function(queryParameters, redirectSearchPageUrl) {
            // todo: will not work when tag is filled
            var defer = $.Deferred();

            var searchQuery = ko.toJSON(queryParameters, function(key, value) {
                if (key !== "offerType" && key !== "tag" && value == null) {
                    return;
                }
                else {
                    return value;
                }
            });

            $.ajax({
                url: endpointUrls.search,
                method: "POST",
                contentType: "application/json",
                data: searchQuery,
            }).done(function() {
                if (redirectSearchPageUrl) {
                    document.location.href = redirectSearchPageUrl;
                } else {
                    defer.resolve();
                }
            }).fail(function(jqXHR, textStatus) {
                defer.reject("Failed to post search query to search api.");
            });

            return defer.promise();
        };

        self.getOfferSearchResult = function() {
            var defer = $.Deferred();

            $.ajax({
                url: endpointUrls.search,
                method: "GET",
                dataType: "json"
            }).done(function(requestSearchResults) {
                var searchResults = ko.observableArray();
                if (requestSearchResults && requestSearchResults.length > 0) {
                    $.each(requestSearchResults, function(index, searchResult) {
                        searchResults.push(searchResult);
                    });
                }
                defer.resolve(searchResults);
            }).fail(function(jqXHR, textStatus) {
                defer.reject("Failed to get offer search result.");
            });

            return defer.promise();
        }

        // Get Offer Types
        var offerTypes = ko.observableArray([]);
        var unwrapOfferTypes = ko.unwrap(offerTypes);
        if (unwrapOfferTypes && unwrapOfferTypes.length > 0) {
            offerTypes(unwrapOfferTypes);
        }

        self.getOfferTypes = function() {
            var defer = $.Deferred();
            defer.resolve(offerTypes);
            return defer.promise();
        }

        // Get Tags
        var getTagsDefer = undefined;
        var cachedTags = ko.observableArray();

        self.getTags = function(force) {
            if (getTagsDefer == undefined) {
                getTagsDefer = $.Deferred();

                if (force || cachedTags().length == 0) {
                    $.ajax({
                        url: endpointUrls.tags,
                        method: "GET",
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
                        defer.reject(errorMsg)
                        getTagsDefer = undefined;
                    });
                } else {
                    getTagsDefer.resolve(cachedTags);
                }
            }

            return getTagsDefer.promise();
        }

        // Recent offers
        self.getRecentOffers = function() {
            var defer = $.Deferred();

            $.ajax({
                url: endpointUrls.recent,
                method: "GET",
                dataType: "json"
            }).done(function(requestedOfferResults) {
                var offerResults = ko.observableArray();
                if (requestedOfferResults && requestedOfferResults.length > 0) {
                    $.each(requestedOfferResults, function(index, searchResult) {
                        offerResults.push(searchResult);
                    });
                }

                defer.resolve(offerResults);
            }).fail(function(jqXHR, textStatus) {
                defer.reject("Failed to get recent offers.");
            });

            return defer.promise();
        }
    }

    return OffersEndpoint;
});