/************************************************************
 * File:            Offer.js
 * Author:          Jonas Kleinkauf, Franz Weidmann
 * LastMod:         19.11.2016
 * Description:     Database module for offers
************************************************************/

//Define Model and Relationships
module.exports = function(schema){
    var Offer = schema.define('Offer', {
        title:  {type: schema.String, limit: 255},
        //offerTypes => 0:apartement, 1: sublet, 2:intermediate-rent,
        //3: couch-surfing, 4: party-sleepover
        offerType: {type: schema.Number, limit: 4},
        description: {type: schema.Text, limit: 4000},
        rent: schema.Number,
        //rentTypes => false: cold, true: warm
        rentType: schema.Boolean,
        rooms: schema.Number,
        sideCosts: schema.Number,
        //priveTypes => 0:monthly, 1: daily, 2: per semester
        priceType: {type: schema.Boolean, limit: 2},
        street: schema.String,
        zipCode: {type: schema.Number, limit:5},
        houseNumber: schema.Number,
        city: schema.String,
        floor: {type: schema.Number, limit: 2},
        size: schema.Real,
        //furnished => false: no, true: yes
        furnished: schema.Boolean,
        //pets allowed => false: no, true: yes
        pets: schema.Boolean,
        bathroomNumber: schema.Number,
        bathroomDescription: {type: schema.Text, limit: 4000},
        kitchenDescription: {type: schema.Text, limit: 4000},
        //cellar available => false: no, true: yes
        cellar: schema.Boolean,
        //parking slot available => false: no, true: yes
        parking: schema.Boolean,
        //elevator available => false: no, true: yes
        elevator: schema.Boolean,
        //accessability available => false: no, true: yes
        accessability: schema.Boolean,
        //WLAN/Wifi available => false: no, true: yes
        wlan: schema.Boolean,
        //LAN/wired internet access available => false: no, true: yes
        lan: schema.Boolean,
        //max internet speed in kbit/s available
        internetSpeed: schema.Number,
        heatingDescription: {type: schema.Text, limit: 4000},
        //television access available => false: no, true: yes
        television: schema.Boolean,
        //dryer available => false: no, true: yes
        dryer: schema.Boolean,
        //washing machine available => false: no, true: yes
        washingMachine: schema.Boolean,
        //telephone access available => false: no, true: yes
        telephone: schema.Boolean,
        creationDate: {type: schema.Date, default: Date.now},
        lastModified: {type: schema.Date, default: Date.now},
        longitude: schema.Float,
        latitude: schema.Float
    },{});


    //Relationships
    var Review = require('./Review')(schema);
    Offer.hasMany(Review, {as: 'reviews', foreignKey: 'offerId'});

    var MediaObject = require('./MediaObject')(schema);
    Offer.hasMany(MediaObject, {as: 'mediaObjects', foreignKey: 'offerId'});

    var Tag = require('./Tag')(schema);
    Offer.hasMany(Tag, {as: 'tags', foreignKey: 'offerId'});

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