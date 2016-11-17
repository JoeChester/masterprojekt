/************************************************************
 * File:            User.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     Database module for users
************************************************************/

//Define Model and Relationships
module.exports = function(schema){
    var User = schema.define('User', {
        email:  {type: schema.String, limit: 255},
        password: {type: schema.String, limit: 255}
    },{
        //Define model functions and validators here!
    });
    return User;
};