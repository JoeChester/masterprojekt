//Define Model and Relationships
module.exports = function(schema){
    var Name = schema.define('Name', {
        name:  {type: schema.String, limit: 255}
    },{
        //Define model functions and validators here!
    });
    return Name;
};