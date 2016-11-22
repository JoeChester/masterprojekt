var schema = require('../models');

// Create Demo Users

var _hash = require('crypto-toolkit').Hash('hex');
//SALT for Hashfunction
const SALT = "fuldaflats#2016#";
const PASSWORD = "fuldaflats";

function createUser(user){
    schema.models.User.create(user, (err, user) =>{
    if(err) console.log(err);
    else console.log("Created User " + user.id + "!");
    });
}

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

