/************************************************************
 * File:            endpoints.js
 * Author:          Jonas Kleinkauf
 * LastMod:         02.12.2016
 * Description:     Aggregator module for REST endpoints
************************************************************/

//Require Setup
var config = require('../config.json')[process.env.NODE_ENV || 'development'];
var express = require('express');
var schema = require('./models');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

//Express Setup
var app = express();
app.use(bodyParser.json());

var sessionStore = new MySQLStore(config.db);
app.use(session({
    key: 'ff_session',
    secret: 'fuldaflats2016',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

//Import Routers
var Offers = require('./endpoints/offers');
app.use('/api/offers', Offers);

var Files = require('./endpoints/files');
app.use('/api/files', Files);

var Tags = require('./endpoints/tags');
app.use('/api/tags', Tags);

var Users = require('./endpoints/users');
app.use('/api/users', Users);

var mediaObjects = require('./endpoints/mediaObjects');
app.use('/api/mediaObjects', mediaObjects);

module.exports = app;