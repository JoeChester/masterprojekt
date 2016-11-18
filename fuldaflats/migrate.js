/************************************************************
 * File:            migrate.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     Little script to migrate the database from
 *                  model definitions
 * Use:             (NODE_ENV=production) node migrate.js 
************************************************************/

//Require Setup
var chalk = require('chalk');
var startup_msg = require('./server/startup_msg');
var schema = require('./server/models');

//Startup Message
startup_msg();

//Migrate Database
console.log("Migrating Database Models...");
schema.autoupdate(function(){
    console.log(chalk.blue("Done! :)"));
    process.exit(0);
});
