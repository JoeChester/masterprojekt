/************************************************************
 * File:            Tag.js
 * Author:          Jonas Kleinkauf
 * LastMod:         18.11.2016
 * Description:     Database module for tags
************************************************************/

//Define Model and Relationships
module.exports = function(schema){
    
    var Tag = schema.define('Tag', {
        title:  {type: schema.String, limit: 255},
        offerId: {type: schema.Number}
    },{});

    //Validators

    Tag.prototype.taglist = function(){
        var taglist = [
            //Languages
            "english", 
            "german", 
            "french", 
            //Faculties
            "computer science", 
            "electrical engineering", 
            "food technology",
            "nutritional sciences",
            "nursing and health sciences",
            "social and cultural sciences",
            "social work",
            "business economics",
            //Interests
            "football",
            "table tennis",
            "music",
            "computer games",
            "party",
            "beerpong"
            ];
        return taglist;
    }
    

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