var schema = require('../models');

// Create Demo Users
var _hash = require('crypto-toolkit').Hash('hex');
//SALT for Hashfunction
const SALT = "fuldaflats#2016#";
const PASSWORD = "fuldaflats";

function createUser(user){
    schema.models.User.create(user, (err, _user) =>{
        if(err) console.log(err);
        else console.log("Created User " + _user.id + "!");
    });
}

console.log("Creating Demo Data for fuldaflats.de (a lot of errors in this script dont matter)...");

var user1 = require('./data/users/1.json');
user1.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user1);

var user2 = require('./data/users/2.json');
user2.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user2);

var user3 = require('./data/users/3.json');
user3.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user3);

var user4 = require('./data/users/4.json');
user4.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user4);

var user5 = require('./data/users/5.json');
user5.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user5);

var user6 = require('./data/users/6.json');
user6.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user6);

var user7 = require('./data/users/7.json');
user7.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user7);

var user8 = require('./data/users/8.json');
user8.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user8);

var user9 = require('./data/users/9.json');
user9.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user9);

var user10 = require('./data/users/10.json');
user10.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user10);

// Create Demo Offers
function createOffer(offer){
    schema.models.Offer.create(offer, (err, _offer) =>{
        if(err) console.log(err);
        else console.log("Created Offer " + _offer.id + "!");
    });
}

var offer1 = require('./data/offers/1.json');
createOffer(offer1);

var offer2 = require('./data/offers/2.json');
createOffer(offer2);

var offer3 = require('./data/offers/3.json');
createOffer(offer3);

var offer4 = require('./data/offers/4.json');
createOffer(offer4);

var offer5 = require('./data/offers/5.json');
createOffer(offer5);

var offer6 = require('./data/offers/6.json');
createOffer(offer6);

var offer7 = require('./data/offers/7.json');
createOffer(offer7);

var offer8 = require('./data/offers/8.json');
createOffer(offer8);

var offer9 = require('./data/offers/9.json');
createOffer(offer9);

var offer10 = require('./data/offers/10.json');
createOffer(offer10);

var offer11 = require('./data/offers/11.json');
createOffer(offer11);

var offer12 = require('./data/offers/12.json');
createOffer(offer12);

// Create Demo Tags
function createTag(tag){
    schema.models.Tag.create(tag, (err, _tag) =>{
        if(err) console.log(err);
        else console.log("Created Tag " + _tag.id + "!");
    });
}

var tags = require('./data/tags.json');
for(i in tags){
    createTag(tags[i]);
}

// Create Demo MOs
function createMediaObject(mo){
    schema.models.MediaObject.create(mo, (err, _mo) =>{
        if(err) console.log(err);
        else console.log("Created MO " + _mo.id + "!");
    });
}

var mos = require('./data/mediaObjects.json');
for(i in mos){
    createMediaObject(mos[i]);
}

function createFavorite(fav){
    schema.models.Favorite.create(fav, (err, _fav)=>{
        if(err) console.log(err);
        else console.log("Created Favorite " + _fav.id + "!");
    });
}

var favs = require('./data/favorites.json');
for(i in favs){
    createFavorite(favs[i]);
}

// Create Demo Reviews
function createReview(rev){
    schema.models.Review.create(rev, (err, _rev)=>{
        if(err) console.log(err);
        else console.log("Created Review " + _rev.id + "!");
    });
};

var revs = require('./data/reviews.json');
for(i in revs){
    createReview(revs[i]);
};