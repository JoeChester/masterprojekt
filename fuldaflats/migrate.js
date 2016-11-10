/*
Fuldaflats.de Database Migration Script

Usage:

node migrate.js

*/

//Require Setup
var chalk = require('chalk');
var startup_msg = require('./server/startup_msg');
var schema = require('./server/models');

//Startup Message
startup_msg();

//Migrate Database
console.log("Migrating Database Models...");
console.log(schema.settings);
schema.autoupdate(function(){
    console.log(chalk.blue("Done! :)"));
    process.exit(0);
});
