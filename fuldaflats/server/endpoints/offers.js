/************************************************************
 * File:            offers.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     REST endpoints for offers
 ************************************************************/

//Require Setup
var express = require('express');
var schema = require('../models');
var router = express.Router({
    mergeParams: true
});
var async = require('async');

//Functions

//Core Endpoint: /api/offers

//Endpoint Definitions

//search for offers
router.post('/search', function (req, res) {
    //Store search queries in session to fetch them later 
    //in different context
    req.session.search = req.body;
    res.sendStatus(204);
});

router.get('/search', function (req, res) {
    //use the stored search queries
    if(req.session.search == null || req.session.search == undefined){
        res.sendStatus(404);
        return;
    }

    let searchQuery = {};
    searchQuery.where = req.session.search;

    schema.models.Offer.find(searchQuery, (err, offers) => {
        if(err){
            res.status(404);
            return res.json(err);
        }

        //Join MediaObjects to Offer
        //Setup Pipeline
        let offer_joins = [];
        offers.forEach(offer => {
            offer_joins.push(cb => {
                //Copy Caminte Model to Plain JSON Object
                //otherwise additional properties will get lost
                let _offer = offer.toJSON();
                //Execute Query
                offer.mediaObjects((err, mediaObjects) => {
                    if (err)
                        return cb(err);
                    //Set additional Property    
                    _offer.mediaObjects = mediaObjects;
                    offer.tags((err, tags) => {
                        if (err)
                            return cb(err);
                        //Set additional Property    
                        _offer.tags = tags;
                        //Callback to Async Parent
                        cb(null, _offer);
                    });
                });

            });
        });

        //Execute Joins in Parallel
        async.parallel(offer_joins, (err, _offers) => {
            if (err) {
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

//recent offers
router.get('/recent', function (req, res) {
    schema.models.Offer.find({order: 'creationDate DESC', limit: 10}, (err, offers) => {
        if(err){
            res.status(404);
            return res.json(err);
        }

        //Join MediaObjects to Offer
        //Setup Pipeline
        let offer_joins = [];
        offers.forEach(offer => {
            offer_joins.push(cb => {
                //Copy Caminte Model to Plain JSON Object
                //otherwise additional properties will get lost
                let _offer = offer.toJSON();
                //Execute Query
                offer.mediaObjects((err, mediaObjects) => {
                    if (err)
                        return cb(err);
                    //Set additional Property    
                    _offer.mediaObjects = mediaObjects;
                    //Callback to Async Parent
                    cb(null, _offer);
                });

            });
        });

        //Execute Joins in Parallel
        async.parallel(offer_joins, (err, _offers) => {
            if (err) {
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
    schema.models.Offer.findById(req.params.offerId, (err, offer) => {
        if(err){
            return res.sendStatus(404);
        }
        let _offer = offer.toJSON(req.session.auth);
        offer.mediaObjects((err, mediaObjects) =>{
            if(!err){
                _offer.mediaObjects = mediaObjects;
            }
            offer.reviews((err, reviews) =>{
                if(!err){
                    _offer.reviews = reviews;
                }
                offer.tags((err, tags) =>{
                    if(!err){
                        _offer.tags = tags;
                        res.json(_offer);
                    }
                });
            });
        });
    });
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
router.delete('/:offerId/review/:reviewId', function (req, res) {
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