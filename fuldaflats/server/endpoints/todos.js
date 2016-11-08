//Require Setup
var express = require('express');
var schema = require('../models');
var router = express.Router({mergeParams: true});

//Endpoint Definitions
router.get('/', function (req, res) {
    schema.models.Todo.find(function (err, todos) {
        if (err != null) {
            res.json(err);
        } else {
            res.json(todos);
        }
    });
});

router.get('/:todoId', function (req, res) {
    schema.models.Todo.findById(req.params.todoId, function (err, todo) {
        if (err != null) {
            res.json(err);
        } else {
            res.json(todo);
        }
    });
});

router.post('/', function (req, res) {
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

router.put('/:todoId', function (req, res) {
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

router.delete('/:todoId', function (req, res) {
    schema.models.Todo.destroyById(req.params.todoId, function (err) {
        if (err != null) {
            res.json(err);
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;