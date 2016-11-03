// -- Deprecated, just some tests with caminte and express
//Setting Up Requires
/*
var caminte = require('caminte');
var express = require('express');

//Setting Up Database Connection
var Schema = caminte.Schema;
var dbConfig = {
         driver     : "mysql",    // or mariadb
         host       : "localhost",
         port       : "3306",
         username   : "root",
         password   : "",
         database   : "caminte_test",
         pool       : false // optional for use pool directly
    };

var schema = new Schema(dbConfig.driver, dbConfig);


// define models 
var Post = schema.define('Post', {
    title:     { type: schema.String, limit: 255 },
    content:   { type: schema.Text },
    created:   { type: schema.Date, default: Date.now },
    updated:   { type: schema.Date, default: Date.now }
});

schema.automigrate();

console.log("Migrate Done!");

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/posts', function (req, res) {
    Post.find(function(err, allPosts){
    res.send(allPosts);
    });
});


app.post('/posts', function (req, res) {
  var newPost = new schema.models.Post;
  newPost.title="Test Title";
  newPost.content="Test Content";
  newPost.save(console.log);
  res.send("Created!");
});

console.log("Starting Express Server");

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/