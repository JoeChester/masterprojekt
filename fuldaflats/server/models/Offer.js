/************************************************************
 * File:            Offer.js
 * Author:          Jonas Kleinkauf
 * LastMod:         18.11.2016
 * Description:     Database module for offers
************************************************************/

//Define Model and Relationships
module.exports = function(schema){
    var Offer = schema.define('Offer', {
        title:          {type: schema.String, limit: 255},
        offerType:      {type: schema.Integer},
        description:    {type: schema.String, limit: 4000},
        creationDate: {type: schema.Date, default: Date.now },
    },{});


    //Relationships
    var Review = require('./Review')(schema);
    Offer.hasMany(Review, {as: 'reviews', foreignKey: 'offerId'});

    var MediaObject = require('./MediaObject')(schema);
    Offer.hasMany(MediaObject, {as: 'mediaObjects', foreignKey: 'offerId'});

    //Validators

    //Custom Functions
    Offer.prototype.toJSON = function(auth){
        let _offer = {};
        _offer.title        = this.title;
        _offer.offerType    = this.offerType;
        _offer.description  = this.description;
        _offer.id           = this.id;
        _offer.creationDate = this.creationDate;
        _offer.reviews      = this._reviews;
        _offer.mediaObjects = this._mediaObjects;
        return _offer;
    };

    Offer.prototype.setReviews = function(reviews){
        this.__data.reviews = reviews;
    }

    return Offer;
};