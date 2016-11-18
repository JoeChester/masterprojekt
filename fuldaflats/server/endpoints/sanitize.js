/************************************************************
 * File:            sanitize.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     a set of importable helper functions to
 *                  sanitize json-output of the REST endpoints
 ************************************************************/

module.exports.currentUser = (user) => {
    //hiden password from responses
    user.password = undefined;
    return user;
}

module.exports.offerBlank = (offer) =>{
    let _offer = {};
    return _offer;
}