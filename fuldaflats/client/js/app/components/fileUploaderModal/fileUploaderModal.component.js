/************************************************************
 * File:            fileUploaderModal.component.js
 * Author:          Franz Weidmann
 * LastMod:         7.12.2016
 * Description:     Logic for the fileUploader component
************************************************************/
define(['text!./fileUploaderModal.component.html',
'css!./fileUploaderModal.component.css',
'fuldaflatsApiClient', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, api, ko, $) {
        function FileUploaderModalModel($, ko) {

            var self = this;

            // MediaObjects which are already uploaded
            self.offerMediaObjectsOnline = ko.observableArray([]);
            // MediaObjects which are selected and are uploadable
            self.offerMediaObjectsOffline = ko.observableArray([]);
            self.offerID = getURLParameter("offerId");
            
            self.removeOfflineMediaObject = function(file){
                self.offerMediaObjectsOffline.remove(file);
            }

            // TODO -> remove mediaObject Endpoint
            self.deleteOnlineMediaObject = function(file){
                console.log("DELETE ONLINE MEDIA");
                self.offerMediaObjectsOnline.remove(file);
            }

            self.uploadMediaObject = function(file){
                var fileIndex = self.offerMediaObjectsOffline.indexOf(file);
                var form = new FormData();
                form.append("file", file);

                if(self.offerMediaObjectsOnline().length > 6)
                    newError(fileIndex, "You reached the upload limit of 7 images!");
                else if(file.size > 5000000)
                    newError(fileIndex, "This image exceeds the size limit of 5 MB!");
                else if(file.type.split("/")[0] != "image")
                    newError(fileIndex, "This is not an image!");
                else {
                    $.ajax({
                        url:"/api/files/offers/" + self.offerID,
                        method: "POST",
                        async: true,
                        processData: false,
                        contentType: false,
                        mimeType: "multipart/form-data",
                        data: form,
                        xhr: newXHRObject.bind(null, file)
                    }).done( function(data){
                        self.offerMediaObjectsOffline.remove(file);
                        updateMediaObjectsOnline();

                    }).fail( function(err){
                        newError(err.responseText);
                    })

                    $("#"+fileIndex+".removeFileBtn").hide();
                    $("#"+fileIndex+".uploadFileBtn").hide(); 
                    $("#"+fileIndex+".progressMediaObjectUpLoad").show(); 

                }
            }

            self.initialize = () => {
                updateMediaObjectsOnline();

                $("#mediaObjectFile").on("change", e => {
                    for(var i=0; i<e.target.files.length; i++){
                        self.offerMediaObjectsOffline.push(e.target.files[i]);
                    }
                })
            }
            
            function newError(fileIndex, errMsg){
                $("#"+fileIndex+".alertFileUpload").show();
                $("#"+fileIndex+".alertFileUpload").html(errMsg);  
            }

            function updateMediaObjectsOnline(){
                var mediaObjectsPromise = api.mediaObjects.findMediaObjectsByOfferID(self.offerID);
                
                mediaObjectsPromise.then( function(data){
                    self.offerMediaObjectsOnline(data);
                })
            }

            function newXHRObject(file) {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", progressUpLoad.bind(null, file), false);
                return xhr;
            }
            function progressUpLoad(file, evt) {
                if (evt.lengthComputable){
                    var fileIndex = self.offerMediaObjectsOffline.indexOf(file);
                    var percent = Math.round(evt.loaded / evt.total * 100, 2);
                    $("#"+fileIndex+".progressMediaObjectUpLoad > div").attr("aria-valuenow", percent+"");
                    $("#"+fileIndex+".progressMediaObjectUpLoad > div").width(percent + "%");
                    $("#"+fileIndex+".progressMediaObjectUpLoad > div").html("Uploading: "+ percent +" % complete");
                }
            }


            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            };

        }
        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    var fileUploader = new FileUploaderModalModel($, ko);
                    fileUploader.initialize();
                    return fileUploader;
                }
            },
            template: componentTemplate
        };
    });