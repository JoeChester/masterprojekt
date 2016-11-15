//Require Setup
var express = require('express');
var schema = require('../models');
var router = express.Router({mergeParams: true});

//Core Endpoint: /api/users

//Endpoint Definitions

//register
router.post('/', function (req, res) {
    res.sendStatus(501);
});

//login
router.post('/auth', function (req, res) {
    res.sendStatus(501);
});

//logout
router.delete('/auth', function (req, res) {
    res.sendStatus(501);
});

//own userdata
router.get('/me', function (req, res) {
    res.sendStatus(501);
});

//modify own userdata
router.put('/me', function (req, res) {
    res.sendStatus(501);
});

//userdata for user with :userId
router.get('/:userId', function (req, res) {
    res.sendStatus(501);
});

module.exports = router;