var schema = require('../models');

schema.models.Favorite.create({
    userId: 1,
    offerId: 5
}, (err, fav) =>{
    console.log("created favorite!");
})