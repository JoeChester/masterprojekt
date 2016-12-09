/************************************************************
 * File:            Offer.js
 * Author:          Jonas Kleinkauf, Franz Weidmann, Plisam Ekpai-Laodema, Martin Herbener
 * LastMod:         05.12.2016
 * Description:     Database module for offers
 ************************************************************/

//Define Model and Relationships
module.exports = function (schema) {
    var Offer = schema.define('Offer', {
        title: {
            type: schema.String,
            limit: 255
        },
        //offerTypes = FLAT, SHARE, COUCH, PARTY, INTERMEDIATE
        offerType: {
            type: schema.String,
            limit: 12
        },
        description: {
            type: schema.Text,
            limit: 4000
        },
        rent: schema.Number,
        //rentTypes => false: cold, true: warm
        rentType: {
            type: schema.String,
            limit: 4
        },
        rooms: schema.Number,
        sideCosts: schema.Number,
        fullPrice: schema.Float,
        deposit: schema.Float,
        commission: schema.Float,
        //priveTypes = DAY, MONTH, SEMSETER
        priceType: {
            type: schema.String,
            limit: 8
        },
        street: schema.String,
        zipCode: {
            type: schema.String,
            limit: 5
        },
        houseNumber: schema.Number,
        city: schema.String,
        floor: {
            type: schema.Number,
            limit: 2
        },
        size: schema.Real,
        //furnished => false: no, true: yes
        furnished: schema.Boolean,
        //pets allowed => false: no, true: yes
        pets: schema.Boolean,
        bathroomNumber: schema.Number,
        bathroomDescription: schema.String,
        kitchenDescription: schema.String,
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
        heatingDescription: schema.String,
        //television access available => false: no, true: yes
        television: schema.String,
        //dryer available => false: no, true: yes
        dryer: schema.Boolean,
        //washing machine available => false: no, true: yes
        washingMachine: schema.Boolean,
        //telephone access available => false: no, true: yes
        telephone: schema.Boolean,
        //0:hidden, 1:public, 2:closed
        status: schema.Boolean,
        creationDate: {
            type: schema.Date,
            default: Date.now
        },
        lastModified: {
            type: schema.Date,
            default: Date.now
        },
        longitude: schema.Float,
        latitude: schema.Float,
        //distance from university in, (calculated upon creation??)
        uniDistance: {
            type: schema.Float
        },

        //userId of Landlord
        landlord: {
            type: schema.Number
        }

    }, {});


    //Relationships
    var Review = require('./Review')(schema);
    Offer.hasMany(Review, {
        as: 'reviews',
        foreignKey: 'offerId'
    });

    var MediaObject = require('./MediaObject')(schema);
    Offer.hasMany(MediaObject, {
        as: 'mediaObjects',
        foreignKey: 'offerId'
    });

    var Tag = require('./Tag')(schema);
    Offer.hasMany(Tag, {
        as: 'tags',
        foreignKey: 'offerId'
    });

    //Validators
    //Offer.validatesPresenceOf('offerTitle', 'offerType', 'street', 'number', 'postCode', 'city', 'description');

    //Custom Functions

    //Data Exchange Funtions
    Offer.prototype.toJSON = function (auth) {
        let _offer = {};
        _offer.title = this.title;
        _offer.offerType = this.offerType;
        _offer.description = this.description;
        _offer.id = this.id;
        _offer.creationDate = this.creationDate;
        _offer.reviews = this._reviews;
        _offer.mediaObjects = this._mediaObjects;
        _offer.thumbnailUrl = "/uploads/dummy.png";
        return _offer;
    };

    Offer.prototype.toJSON_FULL = function (auth) {
        let _offer = {};
        _offer.id = this.id;
        _offer.title = this.title;
        _offer.offerType = this.offerType;
        _offer.description = this.description;
        _offer.rent = this.rent;
        _offer.rentType = this.rentType;
        _offer.rooms = this.rooms;
        _offer.sideCosts = this.sideCosts;
        _offer.fullPrice = this.fullPrice;
        _offer.deposit = this.deposit;
        _offer.commission = this.commission;
        _offer.priceType = this.priceType;
        _offer.street = this.street;
        _offer.zipCode = this.zipCode;
        _offer.houseNumber = this.houseNumber;
        _offer.city = this.city;
        _offer.floor = this.floor;
        _offer.size = this.size;
        _offer.furnished = this.furnished;
        _offer.pets = this.pets;
        _offer.bathroomNumber = this.bathroomNumber;
        _offer.bathroomDescription = this.bathroomDescription;
        _offer.kitchenDescription = this.kitchenDescription;
        _offer.cellar = this.cellar;
        _offer.parking = this.parking;
        _offer.elevator = this.elevator;
        _offer.accessability = this.accessability;
        _offer.wlan = this.wlan;
        _offer.lan = this.lan;
        _offer.internetSpeed = this.internetSpeed;
        _offer.heatingDescription = this.heatingDescription;
        _offer.television = this.television;
        _offer.dryer = this.dryer;
        _offer.washingMachine = this.washingMachine;
        _offer.telephone = this.telephone;
        _offer.status = this.status;
        _offer.creationDate = this.creationDate;
        _offer.lastModified = this.lastModified;
        _offer.longitude = this.longitude;
        _offer.latitude = this.latitude;
        _offer.uniDistance = this.uniDistance;
        _offer.landlord = this.landlord;
        _offer.thumbnailUrl = "/uploads/dummy.png";
        _offer.mediaObjects = [{thumbnailUrl : "/uploads/dummy.png", mainUrl: "/uploads/dummy.png", type: 0}];
        return _offer;
    };

    Offer.prototype.toJSON_STUB = function () {
        let _offer = {};
        _offer.title = this.title;
        _offer.offerType = this.offerType;
        _offer.description = this.description;
        _offer.id = this.id;
        _offer.creationDate = this.creationDate;
        _offer.uniDistance = this.uniDistance;
        _offer.size = this.size;
        _offer.rent = this.rent;
        _offer.rentType = this.rentType;
        _offer.priceType = this.priceType;
        _offer.longitude = this.longitude;
        _offer.latitude = this.latitude;
        _offer.thumbnailUrl = "/uploads/dummy.png";
        //Add Dummy Picture Media Object
        _offer.mediaObjects = [{thumbnailUrl : "/uploads/dummy.png", mainUrl: "/uploads/dummy.png", type: 0}];
        return _offer;
    };

    Offer.prototype.setReviews = function (reviews) {
        this.__data.reviews = reviews;
    }

    return Offer;
};