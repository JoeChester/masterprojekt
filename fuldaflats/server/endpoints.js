//Require Setup
var express = require('express');
var schema = require('./models');
var bodyParser = require('body-parser');

//Express Setup
var app = express();
app.use(bodyParser.json());

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

//Static test_website
app.use(express.static('test_website'));

module.exports = app;