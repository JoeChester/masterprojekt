/************************************************************
 * File:            Review.js
 * Author:          Jonas Kleinkauf
 * LastMod:         18.11.2016
 * Description:     Database module for reviews
************************************************************/

//Define Model and Relationships
module.exports = function(schema){
    var Review = schema.define('Review', {
        title:  {type: schema.String, limit: 255},
        rating: {type: schema.Integer},
        comment: {type: schema.Text}, 
        creationDate: {type: schema.Date, default: Date.now },
        offerId: {type: schema.Number}
    },{});

    //Validators

    return Review;
};