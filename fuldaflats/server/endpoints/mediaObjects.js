/************************************************************
 * File:            mediaObjects.js
 * Author:          Franz Weidmann
 * LastMod:         2.12.2016
 * Description:     REST endpoints for the mediaObject model
 ************************************************************/
var express = require('express');
var schema = require('../models');
var router = express.Router({mergeParams: true});

//Core Endpoint: /api/tags

//Endpoint Definitions

//get mediaObjects by offerID
router.get('/:offerID', (req, res) => {
    schema.models.MediaObject.find({
        where: {
            offerId: req.params.offerID
        }
    }, (err, data) => {
        if (err) {
            res.status(400);
            res.json(err);
        } else {
            res.status(200);
            res.json(data);
        }
    });
});

module.exports = router;