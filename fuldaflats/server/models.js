//Require Setup
var config = require('../config.json')[process.env.NODE_ENV || 'development'];
var caminte = require('caminte');

//CaminteJS Setup
var schema = new caminte.Schema(config.db.driver,  config.db);

//Model Definitions
var Todo = schema.define('Todo', {
    title:  {type: schema.String, limit: 255}
});

//Relationship Definitions
// -- empty for now --

module.exports = schema;