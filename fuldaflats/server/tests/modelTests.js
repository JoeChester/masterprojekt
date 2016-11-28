var schema = require('../models');

schema.models.Tag.find({where: {title: { in: ["english", "german"]}}}, (err, tags) =>{
    console.log(tags);
})