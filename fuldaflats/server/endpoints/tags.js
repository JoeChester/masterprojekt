/************************************************************
 * File:            tags.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     REST endpoints for tags
************************************************************/

//Require Setup
var express = require('express');
var schema = require('../models');
var router = express.Router({mergeParams: true});

//Core Endpoint: /api/tags

//Endpoint Definitions

//all tags
router.get('/', function (req, res) {
    res.sendStatus(501);
});

module.exports = router;