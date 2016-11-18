/************************************************************
 * File:            files.js
 * Author:          Jonas Kleinkauf
 * LastMod:         18.11.2016
 * Description:     REST endpoints for fileupload
************************************************************/

var config = require('../../config.json')[process.env.NODE_ENV || 'development'];
var express = require('express')
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.express.fileUpload)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})


var upload = multer({ storage: storage });
var router = express.Router();

router.post('/', upload.single('file'), function (req, res, next) {
  let _filepath = {};
  _filepath.path = config.express.fileDownload + req.file.filename;
  res.status(201);
  res.json(_filepath);
});

module.exports = router;