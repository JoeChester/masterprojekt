/************************************************************
 * File:            fileUploaderModal.component.js
 * Author:          Franz Weidmann
 * LastMod:         4.12.2016
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
            
            self.removeOfflineMediaObject = file => {
                self.offerMediaObjectsOffline.remove(file);
            }

            // TODO -> remove mediaObject Endpoint
            self.deleteOnlineMediaObject = file => {
                console.log("DELETE ONLINE MEDIA");
                //self.offerMediaObjectsOnline.remove(file);
            }

            self.uploadMediaObject = file => {
                let form = new FormData();
                form.append("file", file);

                $.ajax({
                    url:"/api/files/offers/" + self.offerID,
                    method: "POST",
                    async: true,
                    processData: false,
                    contentType: false,
                    mimeType: "multipart/form-data",
                    data: form,
                    xhr: newXHRObject.bind(null, file)
                }).done( data => {
                    self.offerMediaObjectsOffline.remove(file);
                    updateMediaObjectsOnline();

                }).fail( err => {
                    console.log(err);
                })

                let fileIndex = self.offerMediaObjectsOffline.indexOf(file);
                $("#"+fileIndex+".removeFileBtn").hide();
                $("#"+fileIndex+".uploadFileBtn").hide(); 
                $("#"+fileIndex+".progressMediaObjectUpLoad").show(); 
            }

            self.initialize = () => {
                updateMediaObjectsOnline();

                $("#mediaObjectFile").on("change", e => {
                    for(var i=0; i<e.target.files.length; i++){
                        self.offerMediaObjectsOffline.push(e.target.files[i]);
                    }
                })
            }

            function updateMediaObjectsOnline(){
                let mediaObjectsPromise = api.mediaObjects.findMediaObjectsByOfferID(self.offerID);
                
                mediaObjectsPromise.then( data => {
                    self.offerMediaObjectsOnline(data);
                })
            }

            function newXHRObject(file) {
                let xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", progressUpLoad.bind(null, file), false);
                return xhr;
            }
            function progressUpLoad(file, evt) {
                if (evt.lengthComputable){
                    let fileIndex = self.offerMediaObjectsOffline.indexOf(file);
                    let percent = Math.round(evt.loaded / evt.total * 100, 2);
                    $("#"+fileIndex+".progressMediaObjectUpLoad > div").attr("aria-valuenow", percent+"");
                    $("#"+fileIndex+".progressMediaObjectUpLoad > div").width(percent + "%");
                    $("#"+fileIndex+".progressMediaObjectUpLoad > div").html("Uploading: "+ percent +" % complete");
                    console.log( percent + "% uploaded for "+fileIndex);
                }
            }


            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
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