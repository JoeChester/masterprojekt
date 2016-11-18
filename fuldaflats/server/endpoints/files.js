/************************************************************
 * File:            files.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     REST endpoints for fileupload
************************************************************/

var express = require('express')
var multer  = require('multer');
var upload = multer({ dest: './uploads' });
var router = express.Router();

router.post('/', upload.single('file'), function (req, res, next) {
  console.log(req.file);
  res.sendStatus(201);
});

module.exports = router;