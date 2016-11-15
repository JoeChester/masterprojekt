//Require Setup
var express = require('express');
var schema = require('../models');
var router = express.Router({mergeParams: true});

//Core Endpoint: /api/offers
//Endpoint Definitions
router.get('/', function (req, res) {
    schema.models.Offer.find(function (err, todos) {
        if (err != null) {
            res.json(err);
        } else {
            res.json(todos);
        }
    });
});

router.post('/', function (req, res) {
    schema.models.Offer.create(
        req.body,
        function (err, todo) {
            if (err != null) {
                res.json(err);
            } else {
                res.json(todo);
            }
        });
});

module.exports = router;