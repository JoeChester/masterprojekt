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

//Endpoint Definitions
app.get('/api/todos', function (req, res) {
    schema.models.Todo.find(function (err, todos) {
        if (err != null) {
            res.json(err);
        } else {
            res.json(todos);
        }
    });
});

app.get('/api/todos/:todoId', function (req, res) {
    schema.models.Todo.findById(req.params.todoId, function (err, todo) {
        if (err != null) {
            res.json(err);
        } else {
            res.json(todo);
        }
    });
});

app.post('/api/todos', function (req, res) {
    schema.models.Todo.create(
        req.body,
        function (err, todo) {
            if (err != null) {
                res.json(err);
            } else {
                res.json(todo);
            }
        });
});

app.put('/api/todos/:todoId', function (req, res) {
    schema.models.Todo.updateOrCreate({
            id: req.params.todoId
        },
        req.body,
        function (err, todo) {
            if (err != null) {
                res.json(err);
            } else {
                res.json(todo);
            }
        });
});

app.delete('/api/todos/:todoId', function (req, res) {
    schema.models.Todo.destroyById(req.params.todoId, function (err) {
        if (err != null) {
            res.json(err);
        } else {
            res.sendStatus(204);
        }
    });
});


app.get('/api/views', function (req, res) {
    if(req.session.views >= 0)
        req.session.views ++;
    else
        req.session.views = 0;
    res.json(req.session.views);
});

//Static test_website
app.use(express.static('test_website'));

module.exports = app;