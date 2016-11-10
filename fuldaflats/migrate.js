/*
Fuldaflats.de Database Migration Script

Usage:

node migrate.js

!!! CAREFUL: Migrating will currently remove all Data
in the Database. !!! 
*/

//Require Setup
var chalk = require('chalk');
var startup_msg = require('./server/startup_msg');
var schema = require('./server/models');

//Startup Message
startup_msg();

//Migrate Database
console.log("Migrating Database Models...");
schema.automigrate();
console.log(chalk.blue("Done! :)"));