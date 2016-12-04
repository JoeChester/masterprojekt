/************************************************************
 * File:            editProfilePictureBar.component.js
 * Author:          Patrick Hasenauer
 * LastMod:         02.12.2016
 * Description:     JS Component Handler for edit profile picture bar.
 ************************************************************/
define(['text!./editProfilePictureBar.component.html', 'css!./editProfilePictureBar.component.css', 'knockout', 'jquery'],
    function(componentTemplate, componentCss, ko, $) {
        function EditProfilePictureModel(params) {
            var self = this;
            // your model functions and variables

            self.openFileDialog = function(){
                var elem = document.getElementById("hiddenFileInput");
                if(elem && document.createEvent) {
                    var evt = document.createEvent("MouseEvents");
                    evt.initEvent("click", true, false);
                    elem.dispatchEvent(evt);
                }
            }

            self.uploadPicture = function(){
                console.log($("#hiddenFileInput")[0].files[0]);
            }

            self.standardPicture = function(pictureUrl, data, event){
                console.log(pictureUrl);
                var pictureData = {img: pictureUrl};
                /* 
                From here on: do ajax request like everywhere else
                with:
                method: PUT
                url: /api/users/standardPicture
                data: pictureData
                */
            }

        }

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new EditProfilePictureModel(params);
                }
            },
            template: componentTemplate
        };
    });