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

//Startup Message
startup_msg();

/*
app.post('/upload', upload.single('file'), function (req, res, next) {
  console.log(req.file);
  res.sendStatus(201);
});
*/

//Hook Client + Image Static Files
app.use(express.static('client'));
app.use('/uploads', express.static('uploads'));

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