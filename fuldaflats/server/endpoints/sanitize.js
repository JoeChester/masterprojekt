/************************************************************
 * File:            sanitize.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     a set of importable helper functions to
 *                  sanitize json-output of the REST endpoints
 ************************************************************/

module.exports.currentUser = (user) => {
    user.password = undefined;
    return user;
}