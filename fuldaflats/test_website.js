/************************************************************
 * File:            test_website.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     Main (index) file for test_website
 * Use:             (sudo) pm2 test_website.js --name="test_website"
************************************************************/

var express = require('express');
var app = express();

app.use(express.static('test_website'));

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});