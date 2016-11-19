/************************************************************
 * File:            Favorite.js
 * Author:          Jonas Kleinkauf
 * LastMod:         18.11.2016
 * Description:     Database module for favorites
************************************************************/

//Define Model and Relationships
module.exports = function(schema){
    var Favorite = schema.define('Favorite', {
        userId: {type: schema.Number},
        offerId: {type: schema.Number}
    },{});

    //Validators

    //Relationships
    var Offer = require('./Offer')(schema);
    Favorite.belongsTo(Offer, {as: 'offer', foreignKey: 'offerId'});

    return Favorite;
};