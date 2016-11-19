/************************************************************
 * File:            users.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
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

//SALT for Hashfunction
const SALT = "fuldaflats#2016#";

//Multi-Use Functions

//Send back after resolving all relationships
function finalize(req, res, user, _user){
    res.json(_user);
}

//Authentication of a request session
function authenticate(req, res, successStatus) {
    let passwordHash = _hash.sha512(SALT + req.body.password, 'base64');
    schema.models.User.findOne({where: {email: req.body.email}}, (err, user) => {
        if(err){
            res.status(400);
            res.json(err);
        } else {
            if(passwordHash == user.password){
                req.session.auth = true;
                req.session.user = user;

                res.status(successStatus);
                res.json(user.toJSON());
            } else {
                res.sendStatus(403);
            }
        }
    });
}

//get favorites of a user asynchronously
function getFavorites(req, res, user, _user){
    if(!_user) _user = user.toJSON();
    user.favorites((err, favorites) =>{
        if(!err && favorites && favorites.length > 0){
            _user.favorites = favorites;
        }
        finalize(req, res, user, _user);
    });
}

function getRelationships(req, res, user){
    let _user = user.toJSON();
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
    res.sendStatus(204);
});

//own userdata
router.get('/me', function (req, res) {
    if(!req.session.auth){
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
    res.sendStatus(501);
});

//userdata for user with :userId
router.get('/:userId', function (req, res) {
    res.sendStatus(501);
});

module.exports = router;