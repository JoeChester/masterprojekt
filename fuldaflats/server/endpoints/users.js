/************************************************************
 * File:            users.js
 * Author:          Jonas Kleinkauf, Patrick Hasenauer, Plisam Ekpai-Laodema
 *                  Michelle Rothenbücher
 * LastMod:         10.12.2016
 * Description:     REST endpoints for users and
 *                  authentication
 ************************************************************/

//Require Setup
var express = require('express');
var schema = require('../models');
var router = express.Router({
    mergeParams: true
});
var _hash = require('crypto-toolkit').Hash('hex');
var async = require('async');

//SALT for Hashfunction
const SALT = "fuldaflats#2016#";

//Multi-Use Functions

//RegEx for Email Validation
const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//Send back after resolving all relationships
function finalize(req, res, user, _user) {
    res.json(_user);
}
//Max attemp
const MAX_LOGIN_ATTEMPS = 10;

//Authentication of a request session
function authenticate(req, res, successStatus) {
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(400);
    }

    let passwordHash = _hash.sha512(SALT + req.body.password, 'base64');
    req.body.email = req.body.email.toLowerCase();

    schema.models.User.findOne({ where: { email: req.body.email } }, (err, user) => {
        if (err || user == null) {
            res.status(400);
            return res.json(err);
        }
        else {

            if (passwordHash == user.password && !user.isLocked) {
                req.session.auth = true;
                req.session.user = user;

                if (req.body.rememberMe === true) {
                    var hour = 3600000;
                    req.session.cookie.maxAge = hour * 24 * 7;
                }

                res.status(successStatus);
                //Begin Relationship Pipe
                return getRelationships(req, res, user);
            } else {
                //Disable user after 10 connection failed
                if (user.loginAttempts + 1 < MAX_LOGIN_ATTEMPS && !user.isLocked) {
                    user.loginAttempts += 1;
                    console.log(user);
                    user.save((err, user) => {
                        if (err) {
                            console.log(err);
                            res.status(500);
                            res.json(err);
                        } else {
                            res.sendStatus(403);
                        }
                        return res;
                    });
                }
                else {
                    user.loginAttempts += 1;
                    user.isLocked = true;
                    user.save((err, user) => {
                        if (err) {
                            res.status(500);
                            res.json(err);
                        } else {
                            res.sendStatus(423);
                        }
                        return res;
                    });

                }
            }
        }
    });
}

function getUserOffers(req, res, user, _user) {
    schema.models.Offer.find({ where: { landlord: user.id, status: {in: [1,2]} } }, (err, offers) => {
        if (!err && offers && offers.length > 0) {
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
                        _offer.mediaObjects = mediaObjects;
                        if (mediaObjects[0]) {
                            _offer.thumbnailUrl = mediaObjects[0].thumbnailUrl;
                        }
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
                    return res.json(err);
                }
                _user.offers = _offers;
                finalize(req, res, user, _user);
            });
        } else {
            finalize(req, res, user, _user);
        }

    });
}

//get favorites of a user asynchronously
function getFavorites(req, res, user, _user) {
    if (!_user) _user = user.toJSON();
    user.favorites((err, favorites) => {
        let favoriteJoins = [];
        let offerIds = [];
        if (!err && favorites && favorites.length > 0) {
            for (let i in favorites) {
                offerIds.push(favorites[i].offerId);
            }
            schema.models.Offer.find({ where: { id: { in: offerIds }, status: 1 } }, (err, offers) => {
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
                        _offer.isFavorite = true;
                        //Execute Query
                        offer.mediaObjects((err, mediaObjects) => {
                            if (err)
                                return cb(err);
                            //Set additional Property    
                            _offer.mediaObjects = mediaObjects;
                            if (mediaObjects[0]) {
                                _offer.thumbnailUrl = mediaObjects[0].thumbnailUrl;
                            }
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
                async.parallel(offer_joins, (err, _favorites) => {
                    if (err) {
                        res.status(400);
                        res.json(err);
                    }
                    _user.favorites = _favorites;
                    getUserOffers(req, res, user, _user);
                });

            });
        } else {
            _user.favorites = [];
            getUserOffers(req, res, user, _user);
        }
    });
}

function getRelationships(req, res, user) {
    let _user = user.toJSON_ME();
    getFavorites(req, res, user, _user);
}

//Endpoint Definitions
//Core Endpoint: /api/users

//register
router.post('/', function (req, res) {

    var newUser = new schema.models.User(req.body);

    newUser.isValid(valid => {
        if (!valid) {
            res.status(400);
            res.json(newUser.errors);
        } else {
            newUser.password = _hash.sha512(SALT + newUser.password, 'base64');
            newUser.save((err, createdUser) => {
                if (err) {
                    res.status(400);
                    res.json(err);
                } else {
                    authenticate(req, res, 201);
                }
            });
        }
    });
});

//login
router.post('/auth', function (req, res) {
    authenticate(req, res, 200);
});

//logout
router.delete('/auth', function (req, res) {
    req.session.auth = false;
    req.session.user = undefined;
    req.session.search = undefined;
    req.session.cookie.expires = false;
    req.session.cookie.maxAge = false;

    res.sendStatus(204);
});

//own userdata
router.get('/me', function (req, res) {
    if (!req.session.auth) {
        res.sendStatus(403);
    } else {
        //Fetch user from db to make sure latest data is available
        schema.models.User.findById(req.session.user.id, (err, user) => {
            if (err) {
                res.status(404);
                res.json(err);
            } else {
                //Begin Relationship Pipe
                getRelationships(req, res, user);
            }
        });
    }
});

//modify own userdata
router.put('/me', function (req, res) {
    if (!req.session.auth || !req.session.user.id) {
        res.sendStatus(403);
    } else {
        var _user = req.body;
        let _userId = req.session.user.id;
        //Invalidate some user inputs by default
        delete _user.averageRating;
        delete _user.profilePicture;
        delete _user.id;
        delete _user.type;
        delete _user.creationDate;
        delete _user.upgradeDate;

        //validation
        let hasError = false;
        let editError = {};

        if (_user.email) {
            if (_user.email && !regEmail.test(_user.email)) {
                editError.email = ["Please enter a valid eMail."];
                hasError = true;
            }
        }
        if (hasError == true) {
            res.status(400);
            return res.json(editError);
        }

        //Fetch user from db to make sure latest data is available
        schema.models.User.update({ where: { id: _userId } },
            _user,
            (err, __user) => {
                if (err) {
                    res.status(400);
                    res.json(err);
                } else {
                    schema.models.User.findById(_userId, (err, ___user) => {
                        if (err) {
                            res.status(404);
                            res.json(err);
                        } else {
                            //Begin Relationship Pipe
                            getRelationships(req, res, ___user);
                        }
                    });
                }
            });
    }
});

//become landlord
router.put('/upgrade', function (req, res) {
    if (!req.session.auth) {
        return res.sendStatus(403);
    } else {
        //Fetch user from db to make sure latest data is available
        schema.models.User.findById(req.session.user.id, (err, user) => {
            if (err) {
                res.status(404);
                return res.json(err);
            } else {
                let upgradeError = {};
                if (user.type != 1) {
                    upgradeError.upgrade = ["Unable to upgrade this user account."];
                    res.status(400);
                    return res.json(upgradeError);
                }
                let _upgrade = req.body;
                let _userId = req.session.user.id;
                //Invalidate some user inputs by default
                delete _upgrade.averageRating;
                delete _upgrade.profilePicture;
                delete _upgrade.id;
                delete _upgrade.creationDate;

                let hasError = false;
                if (!_upgrade.phoneNumber) {
                    upgradeError.phoneNumber = ["Please enter a phone number."];
                    hasError = true;
                }
                if (!_upgrade.zipCode) {
                    upgradeError.zipCode = ["Please enter a zip code."];
                    hasError = true;
                }
                if (!_upgrade.city) {
                    upgradeError.city = ["Please enter a city."];
                    hasError = true;
                }
                if (!_upgrade.street) {
                    upgradeError.street = ["Please enter a street."];
                    hasError = true;
                }
                if (!_upgrade.houseNumber) {
                    upgradeError.houseNumber = ["Please enter a house number."];
                    hasError = true;
                }
                if (_upgrade.email && !regEmail.test(_upgrade.email)) {
                    upgradeError.email = ["Please enter a valid eMail."];
                    hasError = true;
                }
                if (hasError == true) {
                    res.status(400);
                    return res.json(upgradeError);
                }
                _upgrade.type = 2;
                _upgrade.upgradeDate = Date.now();
                _upgrade.averageRating = 1;

                schema.models.User.update({ where: { id: _userId } },
                    _upgrade,
                    (err, __user) => {
                        if (err) {
                            res.status(400);
                            res.json(err);
                        } else {
                            schema.models.User.findById(_userId, (err, ___user) => {
                                if (err) {
                                    res.status(404);
                                    res.json(err);
                                } else {
                                    //Begin Relationship Pipe
                                    getRelationships(req, res, ___user);
                                }
                            });
                        }
                    });
            }
        });
    }
});

//change password -> extra endpoint for additional checks
router.put('/changePassword', function (req, res) {
    if (!req.session.auth) {
        return res.sendStatus(403);
    } else {
        let textError = {};
        if (!req.body.passwordNew || req.body.passwordNew.length < 5) {
            textError.password = ['Invalid Password (please use at least 5 characters).']
            res.status(400);
            return res.json(textError);
        }

        let passwordHashOld = _hash.sha512(SALT + req.body.passwordOld, 'base64');
        let passwordHashNew = _hash.sha512(SALT + req.body.passwordNew, 'base64');

        schema.models.User.findOne({ where: { id: req.session.user.id, password: passwordHashOld } }, (err, user) => {
            if (err || user == null) {
                textError.password = ['Invalid password.'];
                res.status(404);
                return res.json(textError);
            }
            user.password = passwordHashNew;
            user.save((err, user) => {
                if (err) {
                    res.status(500);
                    return res.json(err);
                }
                req.session.user = user;
                return res.sendStatus(204);
            });
        });
    }
});


// Use a standard picture / url for the current user
router.put('/standardPicture', function (req, res) {
    if (!req.session.auth) {
        return res.sendStatus(403);
    } else {
        if (!req.body.img) {
            return res.sendStatus(400);
        }
        let pictureUrl = req.body.img;
        schema.models.User.update(
            { where: { id: req.session.user.id } },
            { profilePicture: pictureUrl },
            (err, user) => {
                if (err) {
                    res.status(500);
                    return res.json(err);
                }
                return res.sendStatus(204);
            });
    }
});

//userdata for user with :userId => public profiles, not implemented yet (Prio 2)
router.get('/:userId', function (req, res) {
    res.sendStatus(501);
});

module.exports = router;