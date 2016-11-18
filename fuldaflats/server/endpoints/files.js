/************************************************************
 * File:            files.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     REST endpoints for fileupload
************************************************************/


var express = require('express')
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + '_' + file.originalname);
  }
});

var upload = multer({ storage: storage });

var router = express.Router({mergeParams: true});

router.post('/', upload.single('file'), function (req, res, next) {
    console.log(req.file.mimetype);
    res.sendStatus(201);
});

module.exports = router;