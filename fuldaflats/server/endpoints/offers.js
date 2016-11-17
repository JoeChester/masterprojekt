/************************************************************
 * File:            offers.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     REST endpoints for offers
************************************************************/

//Require Setup
var express = require('express');
var schema = require('../models');
var router = express.Router({mergeParams: true});

//Core Endpoint: /api/offers

//Endpoint Definitions

//search for offers
router.post('/search', function (req, res) {
    res.sendStatus(204);
});

//recent offers
router.get('/recent', function (req, res) {
    res.sendStatus(501);
});

//offer details
router.get('/:offerId', function (req, res) {
    res.sendStatus(501);
});

//create offer
router.post('/', function (req, res) {
    res.sendStatus(501);
});

//modify offer
router.put('/:offerId', function (req, res) {
    res.sendStatus(501);
});

//delete offer (or set inactive?)
router.delete('/:offerId', function (req, res) {
    res.sendStatus(501);
});

//create review
router.post('/:offerId/review', function (req, res) {
    res.sendStatus(501);
});

//delete review
router.delete('/:offerId/review', function (req, res) {
    res.sendStatus(501);
});

//set offer as favorite
router.put('/:offerId/favorite', function (req, res) {
    res.sendStatus(501);
});

//remove offer from favorites
router.delete('/:offerId/favorite', function (req, res) {
    res.sendStatus(501);
});

module.exports = router;