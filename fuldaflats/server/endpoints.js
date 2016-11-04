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
        res.send(todos);
    });
});

app.get('/api/todos/:todoId', function (req, res) {
    schema.models.Todo.findById(req.params.todoId, function(err, todo){
        res.json(todo);
    });
});


app.post('/api/todos', function (req, res) {
    schema.models.Todo.create(
        req.body,
        function (err, todo) {
            res.json(todo);
        });
});

//Static test_website
app.use(express.static('test_website'));

module.exports = app;