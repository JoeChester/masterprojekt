//Require Setup
var chalk = require('chalk');
var startup_msg = require('../startup_msg');
var schema = require('../models');

//Startup Message
startup_msg();

//Migrate Database
console.log("Migrating Database Models, wiping Data...");
schema.automigrate(function(){
    console.log(chalk.blue("Done! :)"));
    process.exit(0);
});
