var schema = require('../models');

schema.models.Tag.create({
    title: "computer science",
    offerId: 1
}, (err, mediaObject) =>{
    console.log("created object 1");
})

schema.models.Tag.create({
    title: "english",
    offerId: 1
}, (err, mediaObject) =>{
    console.log("created object 1");
})

schema.models.Tag.create({
    title: "german",
    offerId: 1
}, (err, mediaObject) =>{
    console.log("created object 1");
})