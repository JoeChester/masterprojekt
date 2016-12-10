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
    if (!req.session.auth) {
        return res.sendStatus(403);
    } else {
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
    }
});

//Delete mediaObject from offer. TODO: Remove file from hard drive... (PRIO2)
router.delete('/:mediaObjectId', (req, res)=>{
    if (!req.session.auth) {
        return res.sendStatus(403);
    }
    //Check if MediaObject exists
    schema.models.MediaObject.findById(req.params.mediaObjectId, (err, mo)=>{
        if(err || !mo){
            return res.sendStatus(404);
        }
        if(!mo.offerId){
            return res.sendStatus(404); 
        }
        //Check if mediaObject belongs to an offer of the currently
        //logged in user
        schema.models.Offer.findById(mo.offerId, (err2, offer) =>{
            if(offer.landlord != req.session.user.id){
                return res.sendStatus(403);
            }
            //Everything ok, destroy mediaObject
            mo.destroy((err) =>{
                if(err){
                    res.status(500);
                    return res.json(err)
                }
                return res.sendStatus(204); 
            })
        })
    })
});

module.exports = router;