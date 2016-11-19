var schema = require('../models');

schema.models.MediaObject.create({
    type : 1,
    mainUrl : "uploads/sampleA.jpg",
    thumbnailUrl : "uploads/sampleA.jpg",
    offerId: 1,
    createdByUserId: 1
}, (err, mediaObject) =>{
    console.log("created object 1");
})

schema.models.MediaObject.create({
    type : 1,
    mainUrl : "uploads/sampleB.jpg",
    thumbnailUrl : "uploads/sampleB.jpg",
    offerId: 1,
    createdByUserId: 1
}, (err, mediaObject) =>{
    console.log("created object 2");
})

schema.models.MediaObject.create({
    type : 1,
    mainUrl : "uploads/sampleC.jpg",
    thumbnailUrl : "uploads/sampleC.jpg",
    offerId: 2,
    createdByUserId: 2
}, (err, mediaObject) =>{
    console.log("created object 3");
})