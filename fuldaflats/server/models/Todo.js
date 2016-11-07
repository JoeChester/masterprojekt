//Define Model and Relationships
module.exports = function(schema){
    var Todo = schema.define('Todo', {
        title:  {type: schema.String, limit: 255}
    },{
        //Define model functions and validators here!
    });
    return Todo;
};