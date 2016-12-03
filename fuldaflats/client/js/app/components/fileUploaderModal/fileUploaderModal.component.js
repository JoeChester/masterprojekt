/************************************************************
 * File:            fileUploaderModal.component.js
 * Author:          Franz Weidmann
 * LastMod:         3.12.2016
 * Description:     Logic for the fileUploader component
************************************************************/
define(['text!./fileUploaderModal.component.html',
'css!./fileUploaderModal.component.css',
'fuldaflatsApiClient', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, api, ko, $) {
        function FileUploaderModalModel($, ko) {
            var self = this;

            self.offerMediaObjectsOnline = ko.observableArray([]);
            self.offerMediaObjectsOffline = ko.observableArray([]);
            self.offerID = 1;// TODO - get current OfferID
            
            // TODO: "just" remove the item from the observable array
            self.removeOfflineMediaObject = file => {
                console.log("REMOVE MEDIA OBJECT");
                
                self.offerMediaObjectsOffline().remove(file);
            }

            // TODO
            self.deleteOnlineMediaObject = file => {
                console.log("DELETE ONLINE MEDIA");
            }

            // TODO atm this error occurs: 400 - {"error":"File was not specified"}
            self.uploadMediaObject = file => {
                console.log("UPLOAD MEDIA OBJECT");
                console.log(file);

                $.ajax({
                    url:"/api/files/offers/" + self.offerID,
                    method: "POST",
                    async: true,
                    processData: false,
                    contentType: false,
                    mimeType: "multipart/form-data",
                    data: new FormData().append("file", file)
                }).done( data => {
                    console.log("UPLOAD SUCCEED");
                    console.log(data);
                    
                    self.removeOfflineMediaObject(file);
                    let newMediaObjects = api.mediaObjects.findMediaObjectsByOfferID(self.offerID);
                    self.offerMediaObjectsOnline(newMediaObjects);
                }).fail( err => {
                    
                    console.log("UPLOAD FAILED");
                    console.log(err.status + " - " +err.responseText);
                }) 
            }

            self.initialize = () => {

                console.log("INIT");
                let mediaObjectsPromise = api.mediaObjects.findMediaObjectsByOfferID(self.offerID);
                
                mediaObjectsPromise.then( data => {
                    console.log("MEDIA READY");
                    console.log(data);
                    self.offerMediaObjectsOnline(data);
                })

                $("#mediaObjectFile").on("change", e => {
                    console.log(e.target.files);
                    self.offerMediaObjectsOffline(e.target.files);
                })
            };

        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                  
                    let fileUploader = new FileUploaderModalModel($, ko);
                    fileUploader.initialize();
                    return fileUploader;
                }
            },
            template: componentTemplate
        };
    });