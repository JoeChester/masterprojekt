/************************************************************
 * File:            index.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     Main (index) file for fuldaflats.de. Contains
 *                  all dependencies, defines static routes and
 *                  starts the server
 * Use:             (sudo) pm2 index.js --name="fuldaflats"
************************************************************/

//Require Setup
var chalk = require('chalk');
var config = require('./config.json')[process.env.NODE_ENV || 'development'];
var express = require('express');
var app = require('./server/endpoints');
var startup_msg = require('./server/startup_msg');

//Express Static Setup
express.static.mime.define({'application/json': ['json']});

//Startup Message
startup_msg();

//Hook Static Folders
app.use(express.static('client'));
app.use('/uploads', express.static('uploads'));
//Test Data
app.use('/test_api', express.static('server/test_api'));


//Startup Express Application
console.log("Starting Express App...");
app.listen(config.express.port, function () {
    console.log('Started Server on Port ' 
        + config.express.port + '. ' 
        + chalk.blue('Have fun! :)')
    );
});