/************************************************************
 * File:            User.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     Database module for users
************************************************************/

//Define Model and Relationships
module.exports = function(schema){
    var User = schema.define('User', {
        email:  {type: schema.String, limit: 255, index: true},
        password: {type: schema.String, limit: 255}
    },{});

    //Validators
    User.validatesPresenceOf('email', 'password');
    User.validatesLengthOf('password', {min: 5, message: 'Password is too short'});
    User.validatesUniquenessOf('email', {message: 'email is not unique'});

    //Test well-formed email
    var emailValidator = function(err){
        if(!/^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:[a-z][a-z])$/.test(this.email)) { err(); }
    };

    User.validate('email', emailValidator, {message: 'Bad email'});

    //Relationships
    var Favorite = require('./Favorite')(schema);
    User.hasMany(Favorite, {as: 'favorites', foreignKey: 'userId'});

    //Custom Functions

    /* The toJSON function maps a CaminteJS model Object
     * to a plain JSON Object for data exchange (for example
     * to remove passwords and other unwanted attributes from
     * the data exchange    */
    User.prototype.toJSON = function(){
        let _user = {};
        _user.id = this.id;
        _user.email = this.email;
        return _user;
    }

    return User;
};