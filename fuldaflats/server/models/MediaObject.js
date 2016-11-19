/************************************************************
 * File:            Review.js
 * Author:          Jonas Kleinkauf
 * LastMod:         18.11.2016
 * Description:     Database module for reviews
************************************************************/

//Define Model and Relationships
module.exports = function(schema){
    var MediaObject = schema.define('MediaObject', {
        type:  {type: schema.Number},
        mainUrl: {type: schema.String},
        thumbnailUrl: {type: schema.String}, 
        creationDate: {type: schema.Date, default: Date.now },
        userId: {type: schema.Number},
        offerId: {type: schema.Number},
        createdByUserId: {type: schema.Number}
    },{});

    //Validators
    
    //Functions

    //Types
    MediaObject.prototype.IMAGE = 1;
    MediaObject.prototype.VIDEO = 2;

    return MediaObject;
};