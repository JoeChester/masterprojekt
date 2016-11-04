//Require Setup
var config = require('./config.json')[process.env.NODE_ENV || 'development'];
var schema = require('./server/models');

//Migrate Database
//TODO: Only do this when started with flag in production!
console.log("Migrating Database Models...");
schema.automigrate();
console.log("Done! :)");