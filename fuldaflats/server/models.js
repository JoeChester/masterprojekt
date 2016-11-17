/************************************************************
 * File:            models.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     Aggregator module for Database 
 *                  models
************************************************************/

//Require Setup
var config = require('../config.json')[process.env.NODE_ENV || 'development'];
var caminte = require('caminte');

//CaminteJS Setup
var schema = new caminte.Schema(config.db.driver,  config.db);

//Model Definitions
var Todo = require('./models/Todo')(schema);
var Offer = require('./models/Offer')(schema);

//Relationship Definitions
// -- empty for now --

module.exports = schema;