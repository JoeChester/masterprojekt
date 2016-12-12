/************************************************************
 * File:            files.js
 * Author:          Jonas Kleinkauf, Franz Weidmann
 * LastMod:         9.12.2016
 * Description:     REST endpoints for fileupload
 ************************************************************/
var UPLOAD_LIMIT = 6;
var UPLOAD_FILESIZE_LIMIT = 5000000; //bytes
           
var config = require('../../config.json')[process.env.NODE_ENV || 'development'];
var express = require('express')
var multer = require('multer');
var schema = require('../models');

 
// Multer definitions
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.express.fileUpload)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
    }
})

// UPLOAD CONSTRAINS
var fileFilter = (req, file, cb)  => {

    //dont use the constrains for
    //non-offer related uploads (profilePicture)
    if(!req.params){
        return cb(null, true);
    }
    if(req.params){
        if(!req.params.offerId){
            return cb(null, true);
        }
    }

    if(file.mimetype.split("/")[0] != "image")
        cb({error:"This is not an image!"}, false);
    else {
        schema.models.MediaObject.count({
            where:{
                offerId: req.params.offerId
            }
        }, (err, count) => {
                if(err)
                    cb(err, false);
                else if(count > UPLOAD_LIMIT)
                    cb({error:"You reached the upload limit of 7 images!"}, false);
                else {
                    cb(null, true)
                }
            }

        )
    }
}

var upload = multer({
    limits: {
        fileSize: UPLOAD_FILESIZE_LIMIT
    },
    fileFilter: fileFilter,
    storage: storage    
}).single('file');
var router = express.Router();

router.post('/offers/:offerId', (req, res) => {
    // UPLOAD FUNCTION
    upload(req, res, (err) => {
        if(err){
            console.log(err);
            res.status(400);
            if(err.code !== undefined && err.code == "LIMIT_FILE_SIZE")
                return res.json({error:"This image exceeds the size limit of 5 MB!"});
            else
                return res.json(err);
        }
        if(!req.file){
            res.status(400);
            return res.json({error: "File was not specified"});
        }

        let _filepath = {};
        _filepath.path = "/" + config.express.fileDownload + req.file.filename;

        schema.models.Offer.findById(req.params.offerId, (err, offer) => {
            if(err){
                res.status(404);
                return res.json(err);
            }
            if(!req.session.user){
                res.status(403);
                return res.json({error: "You have to be logged in to upload an image!"});                
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
                    return res.json({error:"mediaObject save error"});
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
        _filepath.path = "/" + config.express.fileDownload + req.file.filename;

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