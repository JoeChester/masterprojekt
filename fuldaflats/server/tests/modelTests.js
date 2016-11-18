var schema = require('../models');

schema.models.Offer.findById(1, (err, offer)=>{
    console.log(offer.reviews({where: {offerId: offer.id}}));
});