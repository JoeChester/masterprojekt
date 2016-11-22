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

var user1 = require('../test_api/users/1.json');
user1.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user1);

var user2 = require('../test_api/users/2.json');
user2.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user2);

var user3 = require('../test_api/users/3.json');
user3.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user3);

var user4 = require('../test_api/users/4.json');
user4.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user4);

var user5 = require('../test_api/users/5.json');
user5.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user5);

var user6 = require('../test_api/users/6.json');
user6.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user6);

var user7 = require('../test_api/users/7.json');
user7.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user7);

var user8 = require('../test_api/users/8.json');
user8.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user8);

var user9 = require('../test_api/users/9.json');
user9.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user9);

var user10 = require('../test_api/users/10.json');
user10.password = _hash.sha512(SALT + PASSWORD, 'base64');
createUser(user10);

// Create Demo Offers
function createOffer(offer){
    schema.models.Offer.create(offer, (err, _offer) =>{
        if(err) console.log(err);
        else console.log("Created Offer " + _offer.id + "!");
    });
}

var offer1 = require('../test_api/offers/1.json');
createOffer(offer1);

var offer2 = require('../test_api/offers/2.json');
createOffer(offer2);

var offer3 = require('../test_api/offers/3.json');
createOffer(offer3);

var offer4 = require('../test_api/offers/4.json');
createOffer(offer4);

var offer5 = require('../test_api/offers/5.json');
createOffer(offer5);

var offer6 = require('../test_api/offers/6.json');
createOffer(offer6);

var offer7 = require('../test_api/offers/7.json');
createOffer(offer7);

var offer8 = require('../test_api/offers/8.json');
createOffer(offer8);

var offer9 = require('../test_api/offers/9.json');
createOffer(offer9);

var offer10 = require('../test_api/offers/10.json');
createOffer(offer10);

var offer11 = require('../test_api/offers/11.json');
createOffer(offer11);

var offer12 = require('../test_api/offers/12.json');
createOffer(offer12);

// Create Demo Tags
function createTag(tag){
    schema.models.Tag.create(tag, (err, _tag) =>{
        if(err) console.log(err);
        else console.log("Created Tag " + _tag.id + "!");
    });
}

var tags = require('../test_api/tags.json');
for(i in tags){
    createTag(tags[i]);
}