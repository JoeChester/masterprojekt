//Define Model and Relationships
module.exports = function(schema){
    var Person = schema.define('Person', {
        name:  {type: schema.String, limit: 255}
    },{
        //Define model functions and validators here!
    });
    return Person;
};