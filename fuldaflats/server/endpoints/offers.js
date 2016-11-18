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
var async = require('async');

var sanitize = require('./sanitize');

//Functions
//function getReviews

//Core Endpoint: /api/offers

//Endpoint Definitions

//search for offers
router.post('/search', function (req, res) {
    res.sendStatus(204);
});

//recent offers
router.get('/recent', function (req, res) {
    schema.models.Offer.find((err, offers)=>{

        //Join Reviews to Offer
        //Setup Pipeline
        let offer_joins = [];
        offers.forEach(offer =>{
            offer_joins.push(cb => {
                //Copy Caminte Model to Plain JSON Object
                //otherwise additional properties will get lost
                let _offer = offer.toJSON();
                //Execute Query
                offer.reviews((err, reviews) =>{
                    if(err)
                        return cb(err);
                    //Set additional Property    
                    _offer.reviews = reviews;
                    offer.setReviews(reviews);
                    //Callback to Async Parent
                    cb(null, _offer);
                });
                
            });
        });

        //Execute Joins in Parallel
        async.parallel(offer_joins, (err, _offers)=>{
            if(err){
                res.status(400);
                res.json(err);
            }
            res.status(200);
            //_offers contains a list of all Async Callback
            //results of offer_joins
            res.json(_offers);
        });

    });
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