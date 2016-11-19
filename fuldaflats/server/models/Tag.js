/************************************************************
 * File:            Tag.js
 * Author:          Jonas Kleinkauf
 * LastMod:         18.11.2016
 * Description:     Database module for tags
************************************************************/

var taglist = [
    {
        language: [
            "english",
            "german",
            "french"
        ]
    },
    {
        faculty: [
            "computer science",
            "oecotrophology"
        ]
    }
]

//Define Model and Relationships
module.exports = function(schema){
    var Tag = schema.define('Tag', {
        title:  {type: schema.String, limit: 255},
        offerId: {type: schema.Number}
    },{});

    //Validators
    
    Tag.prototype.validate = function(tag){
        for(let i in taglist){
            if(taglist[i].indexOf(tag) !== -1){
                return true;
            }
        }
        return false;
    }

    return Tag;
};