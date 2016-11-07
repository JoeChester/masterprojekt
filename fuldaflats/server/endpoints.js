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
var Todos = require('./endpoints/todos');
app.use('/api/todos', Todos);

app.get('/api/views', function (req, res) {
    if(req.session.views >= 0)
        req.session.views ++;
    else
        req.session.views = 0;
    res.json(req.session.views);
});

module.exports = app;