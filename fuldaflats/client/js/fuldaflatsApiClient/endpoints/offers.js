/************************************************************
 * File:            offer.js
 * Author:          Patrick Hasenauer, Jonas Kleinkauf
 * LastMod:         08.12.2016
 * Description:     Javascript api client endpoints for offers.
 ************************************************************/
define(["jquery", 'knockout'], function($, ko) {

    function OffersEndpoint(offersEndpointUrls, offerTypes) {
        var self = this;
        var endpointUrls = offersEndpointUrls;

        function mapOfferResult(offerResult) {
            var offer = self.getOfferModel();
            var offerResultValue = ko.unwrap(offerResult);
            $.each(Object.keys(offerResultValue), function(index, propertyName) {
                if (offer().hasOwnProperty(propertyName)) {
                    var property = offer()[propertyName];
                    var propertyValue = ko.unwrap(offerResultValue[propertyName]);
                    if (property && propertyValue) {
                        if (ko.isObservable(property) && property.hasOwnProperty('remove') && Array.isArray(propertyValue)) {
                            property(offerRe)
                        } else if (ko.isObservable(property)) {
                            property(propertyValue);
                        } else {
                            property = propertyValue;
                        }
                    }
                }
            });

            return offer;
        }

        self.getOfferModel = function() {
            return ko.observable({
                "id": ko.observable(),
                "title": ko.observable(),
                "offerType": ko.observable(),
                "description": ko.observable(),
                "rent": ko.observable(),
                "rentType": ko.observable(),
                "rooms": ko.observable(),
                "sideCosts": ko.observable(),
                "fullPrice": ko.observable(),
                "deposit": ko.observable(),
                "commission": ko.observable(),
                "priceType": ko.observable(),
                "street": ko.observable(),
                "zipCode": ko.observable(),
                "houseNumber": ko.observable(),
                "city": ko.observable(),
                "floor": ko.observable(),
                "size": ko.observable(),
                "furnished": ko.observable(),
                "pets": ko.observable(),
                "bathroomNumber": ko.observable(),
                "bathroomDescription": ko.observable(),
                "kitchenDescription": ko.observable(),
                "cellar": ko.observable(),
                "parking": ko.observable(),
                "elevator": ko.observable(),
                "accessability": ko.observable(),
                "wlan": ko.observable(),
                "lan": ko.observable(),
                "internetSpeed": ko.observable(),
                "heatingDescription": ko.observable(),
                "television": ko.observable(),
                "dryer": ko.observable(),
                "washingMachine": ko.observable(),
                "telephone": ko.observable(),
                "status": ko.observable(),
                "creationDate": ko.observable(),
                "lastModified": ko.observable(),
                "longitude": ko.observable(),
                "latitude": ko.observable(),
                "uniDistance": ko.observable(),
                "landlord": ko.observable(),
                "thumbnailUrl": ko.observable(),
                "mediaObjects": ko.observableArray(),
                "reviews": ko.observableArray(),
                "tags": ko.observableArray(),
                "favorite": ko.observableArray()
            });
        };

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
                tags: forceNullObservable()
            }
        }

        self.searchOffer = function(queryParameters, redirectSearchPageUrl) {
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
                console.error("Failed to post search query to search api.");
                defer.reject(jqXHR);
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
                console.error("Failed to get offer search result.");
                defer.reject(jqXHR);
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
                        defer.reject(jqXHR)
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
                console.error("Failed to get recent offers.");
                defer.reject(jqXHR);
            });

            return defer.promise();
        }

        // Get Offer By Id
        self.getOfferById = function(offerId) {
            var defer = $.Deferred();

            $.getJSON({
                url: endpointUrls.offers + "/" + offerId,
                method: "GET",
                dataType: "json"
            }).done(function(requestedOffer) {
                if (requestedOffer) {
                    var offer = ko.observable(requestedOffer);
                    defer.resolve(offer);
                } else {
                    console.error("Failed to get offer by id " + offerId + ". Unexpected  server response.");
                    defer.reject(jqXHR);
                }
            }).fail(function(jqXHR, textStatus) {
                console.error("Failed to get offer by id " + offerId);
                defer.reject(jqXHR);
            });

            return defer.promise();
        };

        // Update Offer
        self.updatedOffer = function(offer) {
            var defer = $.Deferred();

            var localOffer = ko.unwrap(offer);

            $.getJSON({
                url: endpointUrls.offers + "/" + localOffer.id,
                method: "PUT",
                contentType: "application/json",
                dataType: "text",
                data: ko.toJSON(localOffer)
            }).done(function(updatedOffer) {
                defer.resolve();
            }).fail(function(jqXHR, textStatus) {
                console.error("Failed to update offer:");
                console.error(localOffer);
                defer.reject(jqXHR);
            });

            return defer.promise();
        }

        // Create Offer
        self.createOffer = function() {
            var defer = $.Deferred();

            $.getJSON({
                url: endpointUrls.offers,
                method: "POST",
                dataType: "json",
            }).done(function(newOffer) {
                if (newOffer) {
                    var offer = mapOfferResult(newOffer);
                    defer.resolve(offer);
                } else {
                    console.error("Failed to create offer. Unexpected  server response.");
                    defer.reject(jqXHR);
                }
            }).fail(function(jqXHR, textStatus) {
                console.error("Failed to create offer:");
                defer.reject(jqXHR);
            });

            return defer.promise();
        }
    }

    return OffersEndpoint;
});