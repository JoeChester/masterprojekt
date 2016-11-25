/************************************************************
 * File:            files.js
 * Author:          Jonas Kleinkauf
 * LastMod:         18.11.2016
 * Description:     REST endpoints for fileupload
 ************************************************************/

var config = require('../../config.json')[process.env.NODE_ENV || 'development'];
var express = require('express')
var multer = require('multer');
var schema = require('../models');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.express.fileUpload)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
    }
})


var upload = multer({
    storage: storage
}).single('file');
var router = express.Router();

router.post('/offers/:offerId', function (req, res) {
    upload(req, res, function (err) {
        if(err){
            res.status(400);
            return res.json(err);
        }
        if(!req.file){
            res.status(400);
            return res.json({error: "File was not specified"});
        }

        let _filepath = {};
        _filepath.path = config.express.fileDownload + req.file.filename;

        schema.models.Offer.findById(req.params.offerId, (err, offer) => {
            if(err){
                res.status(404);
                return res.json(err);
            }
            if(offer.landlord != req.session.user.id){
                res.status(403);
                return res.json({error: "Only the landlord can upload images for this offer"});                
            }

            var _mediaObject = new schema.models.MediaObject({
                type: 1, //currently only pictures supported
                mainUrl: _filepath.path,
                thumbnailUrl: _filepath.path,
                createdByUserId: req.session.user.id,
                offerId: req.params.offerId
            });

            _mediaObject.save((err, mediaObject) =>{
                if(err){
                    res.status(400);
                    return res.json("mediaObject save error");
                }

                res.status(201);
                return res.json(mediaObject);
            });
        });
    });
});

router.post('/profilePicture', function (req, res) {
    upload(req, res, function (err) {
        if(err){
            res.status(400);
            return res.json(err);
        }
        if(!req.file){
            res.status(400);
            return res.json({error: "File was not specified"});
        }

        if(!req.session.user.id){
            res.status(403);
            return res.json({error: "Please sign in first"});
        }

        let _filepath = {};
        _filepath.path = config.express.fileDownload + req.file.filename;

        schema.models.User.update(
            { where: {id: req.session.user.id}} , 
            { profilePicture: _filepath.path},
            (err, user) =>{
                if(err){
                    res.status(500);
                    return res.json(err);
                }
                res.redirect('/api/users/me');
        })
    });
});

module.exports = router;