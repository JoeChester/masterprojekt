/************************************************************
 * File:            offers.js
 * Author:          Jonas Kleinkauf, Plisam Ekpai-Laodema,
 *                  Franz Weidmann
 * LastMod:         02.12.2016
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

//Recursively crawl the current search query before
//sending and remova all null or empty values
function ffRemoveNulls(obj) {
    var isArray = obj instanceof Array;
    for (var k in obj) {
        if (obj[k] === null || obj[k] == "") isArray ? obj.splice(k, 1) : delete obj[k];
        else if (typeof obj[k] == "object") obj[k] = ffRemoveNulls(obj[k]);
    }
    return obj;
}

//Core Endpoint: /api/offers

//create offer
router.post('/', function (req, res) {
    if (!req.session.auth) {
        res.sendStatus(403);
    } else {
        let offer = new schema.models.Offer();
        offer.landlord = req.session.user.id;
        offer.status = 0;
        offer.save((err, _offer) =>{
            if (err != null) {
                    res.json(err);
                } else {
                    res.json(_offer);
                }
        });
    }
});

//modify offer
router.put('/:offerId', function (req, res) {
    if (!req.session.auth) {
        return res.sendStatus(403);
    } else {
        var _offer = req.body;
        schema.models.Offer.update({
                where: {
                    id: req.params.offerId,
                    landlord: req.session.user.id
                }
            },
            _offer,
            (err, offer) => {
                if (err) {
                    res.status(400);
                    return res.json(err);
                } else {
                    if(offer.toString() != 1){
                        return res.sendStatus(401);
                    }
                    return res.sendStatus(200);
                }
            });
    }
});

//delete offer
router.delete('/:offerId', function (req, res) {
    // This implementation was really really sloppy, 
    // deleted it for now to recreate it better later
    return res.sendStatus(501);
});


//Endpoint Definitions

//search for offers

router.post('/search', function (req, res) {
    //Store search queries in session to fetch them later 
    //in different context
    req.session.search = req.body;

    //Resolve tag search relationship
    if (req.session.search.tags) {
        schema.models.Tag.find({
            where: {
                title: { in: req.session.search.tags
                }
            }
        }, (err, tags) => {
            req.session.search.id = {};
            req.session.search.id.in = [];
            for (i in tags) {
                req.session.search.id.in.push(tags[i].offerId);
            }
            req.session.search.tags = undefined;
            return res.sendStatus(204);
        });
    } else {
        return res.sendStatus(204);
    }
});

router.get('/search', function (req, res) {
    //use the stored search queries
    if (!req.session.search) {
        res.status(404);
        var _noOffers = [];
        return res.json(_noOffers);
    }

    let searchQuery = {};
    searchQuery.where = req.session.search;
    searchQuery.where = ffRemoveNulls(searchQuery.where);
    searchQuery.where.status = 1;

    schema.models.Offer.find(searchQuery, (err, offers) => {
        if (err) {
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
                let _offer = offer.toJSON_STUB();
                //Execute Query
                offer.mediaObjects((err, mediaObjects) => {
                    if (err)
                        return cb(err);
                    //Set additional Property    
                    if (mediaObjects[0]) {
                        _offer.mediaObjects = mediaObjects;
                        _offer.thumbnailUrl = mediaObjects[0].thumbnailUrl;
                    }
                    offer.tags((err, tags) => {
                        if (err)
                            return cb(err);
                        //Set additional Property    
                        _offer.tags = tags;
                        if (req.session.auth) {
                            schema.models.Favorite.findOne({
                                where: {
                                    userId: req.session.user.id,
                                    offerId: offer.id
                                }
                            }, (err, fav) => {
                                if (!err && fav && fav != null) {
                                    _offer.isFavorite = true;
                                } else {
                                    _offer.isFavorite = false;
                                }
                                cb(null, _offer);
                            })
                        } else {
                            //Callback to Async Parent
                            cb(null, _offer);
                        }
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

//get last search parameters
router.get('/search/last', function (req, res) {
    if (!req.session.search) {
        res.status(404);
        var _noParameters = [];
        return res.json(_noParameters);
    } else {
        if(req.session.search.id){
            delete req.session.search.id;
        }
        res.json(req.session.search);
    }
});

//recent offers
router.get('/recent', function (req, res) {
    schema.models.Offer.find({
        where: {
            status : 1 //only find active offers
        },
        order: 'creationDate DESC',
        limit: 10
    }, (err, offers) => {
        if (err) {
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
                let _offer = offer.toJSON_STUB();
                //Execute Query
                offer.mediaObjects((err, mediaObjects) => {
                    if (err)
                        return cb(err);
                    //Set additional Property    
                    if (mediaObjects[0]) {
                        _offer.mediaObjects = mediaObjects;
                        _offer.thumbnailUrl = mediaObjects[0].thumbnailUrl;
                    }
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
        if (err) {
            return res.sendStatus(404);
        }
        //Only Owners can see inactive offers
        if(req.session.auth){
            if(offer.status != 1 && offer.landlord != req.session.user.id){
                return res.sendStatus(401);
            }
        }
        let _offer = offer.toJSON_FULL(req.session.auth);
        offer.mediaObjects((err, mediaObjects) => {
            if (!err) {
                if (mediaObjects[0]) {
                    _offer.mediaObjects = mediaObjects;
                    _offer.thumbnailUrl = mediaObjects[0].thumbnailUrl;
                }
            }
            offer.reviews((err, reviews) => {
                if (!err) {
                    _offer.reviews = reviews;
                }
                offer.tags((err, tags) => {
                    if (!err) {
                        _offer.tags = tags;
                    }
                    schema.models.User.findById(_offer.landlord, (err, _user) => {
                        if (!err) {
                            _offer.landlord = _user.toJSON_STUB();
                        }
                        //Dont find any favorites if not authenticated
                        let favoriteUserId = 0;
                        if (req.session.auth) {
                            favoriteUserId = req.session.user.id;
                        }
                        schema.models.Favorite.find({
                            where: {
                                userId: favoriteUserId,
                                offerId: _offer.id
                            }
                        }, (err, favorite) => {
                            if (!err && favorite) {
                                _offer.favorite = favorite;
                            }
                            res.status(200);
                            return res.json(_offer);
                        });
                    });
                });
            });
        });
    });
});


//create review
router.post('/:offerId/review', function (req, res) {
    //check wether the offer exists at all
    schema.models.Offer.exists(req.param.offerId, err => {
        if (err) {
            res.status(400);
            res.json(err);
        } else {
            var newReview = new schema.models.Review(req.body);

            newReview.userId = req.param.session.user.id,
                newReview.offerId = req.param.offerId;
            newReview.save(err => {
                if (err) {
                    res.status(400);
                    res.json(err);
                } else
                    res.sendStatus(201);
            });
        }
    });
});

//delete review
router.delete('/:offerId/review/:reviewId', function (req, res) {

    schema.models.Review.find({
        where: {
            userId: req.param.session.user.id,
            offerId: req.param.offerId,
            id: req.param.reviewId
        }
    }, (err, review) => {
        review.destroy(err => {
            if (err) {
                res.status(400);
                res.json(err);
            } else
                res.sendStatus(200);
        });
    });

});

//set offer as favorite
router.put('/:offerId/favorite', function (req, res) {
    if (!req.session.auth) {
        res.status(403);
        return res.json({
            signin: ["You have to sign in before you can mark offers as favorite."]
        });
    }
    //check wether the offer exists at all
    schema.models.Offer.exists(req.params.offerId, err => {
        if (err) {
            res.status(400);
            return res.json(err);
        } else {
            schema.models.Favorite.findOrCreate({
                offerId: req.params.offerId,
                userId: req.session.user.id
            }, (err, fav) => {
                if (err) {
                    res.status(400);
                    return res.json(err);
                } else
                    res.sendStatus(201);
            });
        }
    });
});

//remove offer from favorites
router.delete('/:offerId/favorite', function (req, res) {
    if (!req.session.auth) {
        res.status(403);
        return res.json({
            signin: ["You have to sign in before you can unmark offers as favorite."]
        });
    }

    schema.models.Favorite.remove({
        where: {
            userId: req.session.user.id,
            offerId: req.params.offerId
        }
    }, (err) => {
        if (err) {
            res.status(500);
            return res.json(err);
        } else {
            return res.sendStatus(200);
        }

    });
});

module.exports = router;