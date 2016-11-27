/************************************************************
 * File:            User.js
 * Author:          Plisam Ekpai-Laodema, Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     Database module for users
************************************************************/

//Define Model and Relationships
module.exports = function(schema){
    var User = schema.define('User', {
        email:          {type: schema.String, limit: 255, index: true},
        password:       {type: schema.String, limit: 255},
        type:           {type: schema.Number, limit: 1},
        firstName:      {type: schema.String, limit: 255},
        lastName:       {type: schema.String, limit: 255},
        birthday:       {type: schema.Date},
        upgradeDate:    {type: schema.Date},
        creationDate:   {type: schema.Date},
        phoneNumber:    {type: schema.String, limit: 255},
        zipCode:        {type: schema.String, limit: 5},
        city:           {type: schema.String, limit: 255},
        street:         {type: schema.String, limit: 255},
        houseNumber:    {type: schema.String, limit: 5},
        gender:         {type: schema.String, limit: 6},
        officeAddress:  {type: schema.String, limit: 4000},
        averageRating:  {type: schema.Float, default: 0.0},
        profilePicture: {type: schema.String, limit: 255, default: 'uploads/cupcake.png'}
    },{});

    //Validators
    User.validatesPresenceOf('email', 'password');
    User.validatesLengthOf('password', {min: 5, message: 'Password is too short'});
    User.validatesUniquenessOf('email', {message: 'email is not unique'});

    //Test well-formed email
    var emailValidator = function(err){
        if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.email)) { err(); }
    };

    //User.validate('email', emailValidator, {message: 'Bad email'});

    //Relationships
    var Favorite = require('./Favorite')(schema);
    User.hasMany(Favorite, {as: 'favorites', foreignKey: 'userId'});

    //Own Offers
    var Offer = require('./Offer')(schema);
    User.hasMany(Offer, {as: 'offers', foreignKey: 'landlord'});

    //Custom Functions

    /* The toJSON function maps a CaminteJS model Object
     * to a plain JSON Object for data exchange (for example
     * to remove passwords and other unwanted attributes from
     * the data exchange    */
    User.prototype.toJSON_ME = function(){
        let _user = {};
        _user.id = this.id;
        _user.email = this.email;
        _user.type = this.type;
        _user.firstName = this.firstName;
        _user.lastName = this.lastName;
        _user.birthday = this.birthday;
        _user.upgradeDate = this.upgradeDate;
        _user.creationDate = this.creationDate;
        _user.phoneNumber = this.phoneNumber;
        _user.zipCode = this.zipCode;
        _user.city = this.city;
        _user.street = this.street;
        _user.houseNumber = this.houseNumber;
        _user.gender = this.gender;
        _user.officeAddress = this.officeAddress;
        _user.averageRating = this.averageRating;
        _user.profilePicture = this.profilePicture;
        return _user;
    }

    return User;
};