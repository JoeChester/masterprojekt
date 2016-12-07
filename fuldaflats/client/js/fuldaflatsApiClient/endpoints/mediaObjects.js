/************************************************************
 * File:            mediaObjects.js
 * Author:          Franz Weidmann
 * LastMod:         3.12.2016
 * Description:     API to recieve data from the mediaObject Model
************************************************************/
define(["jquery", 'knockout'], function ($, ko) {

    function MediaObjectEndpoint(mediaObjectEndpointUrls) {
        var self = this;

        self.findMediaObjectsByOfferID = function (offerID) {
            var defer = $.Deferred();

            $.ajax({
                url: mediaObjectEndpointUrls.getMediaObjectsByUserID + "/" + offerID,
                method: "GET",
                contentType: "application/json",
            }).done(function (data) {
                defer.resolve(data);
            }).fail(function () {
                defer.reject("Failed to collect mediaObjects.");
            });

            return defer.promise();
        }
    }
    return MediaObjectEndpoint;
});