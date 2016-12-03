/************************************************************
 * File:            mediaObjects.js
 * Author:          Franz Weidmann
 * LastMod:         3.12.2016
 * Description:     API to recieve data from the mediaObject Model
************************************************************/
define(["jquery", 'knockout'], ($, ko) => {

    function MediaObjectEndpoint(mediaObjectEndpointUrls){
        let self = this;

        self.findMediaObjectsByOfferID = offerID => {
            let defer = $.Deferred();

            $.ajax({
                url: mediaObjectEndpointUrls.getMediaObjectsByUserID + "/" + offerID,
                method: "GET",
                contentType: "application/json",
            }).done( data => {
                defer.resolve(data);
            }).fail( () => {
                defer.reject("Failed to collect mediaObjects.");
            });

            return defer.promise();
        }
    }
    return MediaObjectEndpoint;
});