//Define Model and Relationships
module.exports = function(schema){
    var Offer = schema.define('Offer', {
        title:  {type: schema.String, limit: 255},
        offer_type:  {type: schema.Integer},
        description:  {type: schema.String, limit: 4000}
    },{
        //Define model functions and validators here!
    });
    return Offer;
};