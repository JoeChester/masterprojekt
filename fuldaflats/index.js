//Require Setup
var chalk = require('chalk');
var config = require('./config.json')[process.env.NODE_ENV || 'development'];
var app = require('./server/endpoints');
var express = require('express');
var startup_msg = require('./server/startup_msg');

//Startup Message
startup_msg();

//Hook Client + Image Static Files
app.use(express.static('client'));
app.use('/files', express.static('uploads'));

express.static.mime.define({'application/json': ['json']});

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