/************************************************************
 * File:            offers.js
 * Author:          Jonas Kleinkauf
 * LastMod:         13.12.2016
 * Description:     REST endpoints for offers
 ************************************************************/

//Require Setup
var express = require('express');
var schema = require('../models');
var router = express.Router({
    mergeParams: true
});
var async = require('async');
var geo = require('node-geo-distance');
let request = require('request');
let utf8 = require('utf8');

const HSFuldaCoords = {
    latitude: 50.5648258,
    longitude: 9.6842798
};

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
        offer.save((err, offer) => {
            if (err != null) {
                return res.json(err);
            } else {
                var _offer = offer.toJSON_STUB();
                schema.models.User.findById(offer.landlord, (err, _user) => {
                    if (err != null) {
                        return res.json(err);
                    } else {
                        _offer.landlord = _user.toJSON_STUB();
                        return res.json(_offer);
                    }
                });
            }
        });
    }
});

function getGeoCoordinates(offer, cb) {
    if (!offer.street || !offer.houseNumber || !offer.zipCode || !offer.city) {
        return cb(offer);
    }
    let osmQuery = "http://nominatim.openstreetmap.org/search?street=" +
        offer.street + " " + offer.houseNumber + "&postalcode=" +
        offer.zipCode + "&city=" + offer.city + "&format=json";
    osmQuery = utf8.encode(osmQuery);
    request(osmQuery, function (error, response, body) {
        if (error && !body) {
            return cb(offer);
        }
        let result = JSON.parse(body)[0];
        if (!result) {
            return cb(offer);
        }
        if (!result.lat || !result.lon) {
            return cb(offer);
        }
        offer.latitude = parseFloat(result.lat);
        offer.longitude = parseFloat(result.lon);
        return cb(offer);
    });
}

function createTags(offerId, tags, tagsCb) {

    //Check if tags need to be modified at all
    if (tags == null) {
        //Nothing to do here, return
        return tagsCb(true);
    }
    //first: remove all current tags to not have any dangles
    schema.models.Tag.remove({
        where: {
            offerId: offerId
        }
    }, (err) => {
        if (err) {
            return tagsCb(false);
        }
        if (tags.length == 0) {
            return tagsCb(true);
        }
        let tag_queue = [];
        tags.forEach(tag => {
            tag_queue.push(cb => {
                schema.models.Tag.create({
                    title: tag,
                    offerId: offerId
                }, (err, _tag) => {
                    if (err) {
                        return cb(err);
                    }
                    return cb(null, _tag);
                })
            })
        });
        //Create all tags in parallel
        async.parallel(tag_queue, (err, _tags) => {
            if (err) {
                return tagsCb(false);
            }
            return tagsCb(true);
        });
    })
}

//modify offer
router.put('/:offerId', function (req, res) {
    if (!req.session.auth) {
        return res.sendStatus(403);
    } else {
        let _offer = req.body;
        let _tags = null;

        if (_offer.tags) {
            _tags = _offer.tags;
            delete _offer.tags;
        }

        getGeoCoordinates(_offer, (_offer) => {
            if (_offer.latitude && _offer.longitude) {
                //Use accurate algorithm to calculate uni distance
                _offer.uniDistance = geo.vincentySync({
                    latitude: HSFuldaCoords.latitude,
                    longitude: HSFuldaCoords.longitude
                }, {
                        latitude: _offer.latitude,
                        longitude: _offer.longitude
                    });
                //m -> km (Rounded to 2 decimal places)
                _offer.uniDistance = Math.round((_offer.uniDistance / 1000) * 100) / 100;
            }

            //create tags
            createTags(req.params.offerId, _tags, (success) => {
                if (success == false) {
                    res.status(500);
                    return res.json({
                        tags: ['A server error occurred during the creation of the offer tags']
                    })
                }

                //Save Offer
                schema.models.Offer.update({
                    where: {
                        id: req.params.offerId,
                        landlord: req.session.user.id
                    }
                }, _offer, (err, _offer) => {
                    if (err || !_offer) {
                        res.status(404);
                        return res.json(err);
                    } else {
                        if (_offer.toString() != 1) {
                            return res.sendStatus(401);
                        }
                        return res.sendStatus(200);
                    }
                })
            })
        });
    }
});

//delete offer
router.delete('/:offerId', function (req, res) {
    // This implementation was really really sloppy, 
    // deleted it for now to recreate it better later
    if (!req.session.auth) {
        return res.sendStatus(403);
    }
    schema.models.Offer.findById(req.params.offerId, (err, offer) => {
        if (err || !offer) {
            res.status(404);
            return res.json({ offer: ['The offer was not found.'] });
        }
        if (offer.landlord != req.session.user.id) {
            res.status(401)
            return res.json({ auth: ['You can only delete your own offers.'] });
        }
        offer.destroy((err) => {
            if (err) {
                res.status(500);
                return res.json(err);
            }
            //Destroy ok!
            return res.sendStatus(204);
        });
    });
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
                title: {
                    in: req.session.search.tags
                }
            }
        }, (err, tags) => {
            req.session.search.id = {};
            req.session.search.id.in = [];
            for (i in tags) {
                req.session.search.id.in.push(tags[i].offerId);
            }
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
    delete searchQuery.where.tags;
    searchQuery.where = ffRemoveNulls(searchQuery.where);
    searchQuery.where.status = 1;

    schema.models.Offer.find(searchQuery, (err, offers) => {
        if (err || !offers) {
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
        if (req.session.search.id) {
            delete req.session.search.id;
        }
        if (req.session.search.tags) {
            var fixedTags = [];
            for (var i = 0; i < req.session.search.tags.length; i++) {
                fixedTags[i] = req.session.search.tags[i].replace(/'/g,"");
            }
            req.session.search.tags = fixedTags;
        }
        res.json(req.session.search);
    }
});

//recent offers
router.get('/recent', function (req, res) {
    schema.models.Offer.find({
        where: {
            status: 1 //only find active offers
        },
        order: 'creationDate DESC',
        limit: 10
    }, (err, offers) => {
        if (err || !offers) {
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
        if (err || !offer) {
            return res.sendStatus(404);
        }
        //Only Owners can see inactive offers
        if (req.session.auth) {
            if (offer.status != 1 && offer.landlord != req.session.user.id) {
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

//get all offer reviews with user details
router.get('/:offerId/review', function (req, res) {
    if (!req.session.auth) {
        return res.sendStatus(404);
    }
    schema.models.Offer.findById(req.params.offerId, (err1, offer) => {
        if (err1 || !offer) {
            return res.sendStatus(404);
        }
        //Only Owners can see inactive offers
        if (req.session.auth) {
            if (offer.status != 1 && offer.landlord != req.session.user.id) {
                return res.sendStatus(401);
            }
        }
        schema.models.Review.find({
            where: {
                offerId: req.params.offerId
            }
        }, (err2, reviews) => {
            if (err2 || !reviews) {
                return res.sendStatus(404);
            }

            let reviews_join = [];
            reviews.forEach(review => {
                reviews_join.push(cb => {
                    //Plain JSON object
                    let _review = review.toJSON();
                    //Execute to Seach User Detail STUBS
                    schema.models.User.find({
                        where: {
                            id: _review.userId
                        }
                    }, (err3, user) => {
                        if (!err3 && user) {
                            //implicit toJSON_STUB because parallel runtime...
                            _review.user = user[0];
                            if (_review.user.id == req.session.user.id) {
                                _review.canDelete = true;
                            } else {
                                _review.canDelete = false;
                            }
                        }
                        cb(null, _review);
                    });

                });
            });

            //Execute Joins in Parallel
            async.parallel(reviews_join, (err, _reviews) => {
                if (err) {
                    res.status(500);
                    res.json(err);
                }
                res.status(200);
                //_offers contains a list of all Async Callback
                //results of offer_joins
                res.json(_reviews);
            });
        })
    });
});

//create review
router.post('/:offerId/review', function (req, res) {
    if (!req.session.auth) {
        res.status(403);
        return res.json({
            signin: ["You have to sign in before you can post reviews."]
        });
    }

    let _review = req.body;

    let reviewError = {};
    let hasError = false;

    if (!_review.rating || isNaN(_review.rating)) {
        editError.rating = ["Please enter a valid rating."];
        hasError = true;
    }
    if (!_review.title) {
        editError.rating = ["Please enter a valid title."];
        hasError = true;
    }
    if (!_review.comment) {
        _review.comment = "";
    }

    if (hasError == true) {
        res.status(400);
        return res.json(editError);
    }

    schema.models.Offer.findById(req.params.offerId, (err, offer) => {
        if (err || !offer || offer.status == 0) {
            return res.sendStatus(404);
        }

        if (offer.type == "FLAT" || offer.type == "SHARE") {
            res.status(401);
            return res.json({
                offerType: ["You can not post reviews for offer with type FLAT or SHARE"]
            });
        }

        if (offer.landlord == req.session.user.id) {
            res.status(401);
            return res.json({
                ownOffer: ["You can not post reviews your own offer."]
            });
        }

        //Save rating Landlord for later
        let _ratingLandlord = offer.landlord;

        //Check if user allready created a review for the offer
        schema.models.Review.findOne({
            where: {
                offerId: offer.id,
                userId: req.session.user.id
            }
        }, function (err2, existingReview) {
            if (existingReview) {
                res.status(401);
                return res.json({
                    review: ["You can only post one review per offer"]
                });
            }

            //Everything set up, create new review and save!
            let newReview = new schema.models.Review(_review);
            newReview.creationDate = Date.now();
            newReview.offerId = offer.id;
            newReview.userId = req.session.user.id;
            newReview.save((err3, createdReview) => {
                if (err3 || !createdReview) {
                    res.status(500);
                    return res.json(err3);
                }

                //Review Saved! Calulate new average rating for landlord!
                schema.models.Offer.find({
                    where: {
                        landlord: _ratingLandlord
                    }
                }, (err4, offers) => {
                    let _offerIds = [];
                    for (let i in offers) {
                        _offerIds.push(offers[i].id);
                    }
                    if (_offerIds.length == 0) {
                        return res.sendStatus(500);
                    }
                    schema.models.Review.find({
                        where: {
                            offerId: {
                                in: _offerIds
                            }
                        }
                    }, (err5, allReviews) => {
                        let _newAverageRating = 0;
                        for (let i in allReviews) {
                            _newAverageRating += allReviews[i].rating;
                        }
                        _newAverageRating = _newAverageRating / allReviews.length;
                        //Calculation finished! Save for Landlord...
                        schema.models.User.update({
                            where: {
                                id: _ratingLandlord
                            }
                        }, {
                                averageRating: _newAverageRating
                            }, (err6, updatedLandlord) => {
                                if (err6) {
                                    return res.sendStatus(500)
                                }
                                //Finally finished!
                                return res.sendStatus(201);
                            });
                    });
                });
            });
        });
    });
});

//delete review
router.delete('/:offerId/review/:reviewId', function (req, res) {
    res.sendStatus(501);
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