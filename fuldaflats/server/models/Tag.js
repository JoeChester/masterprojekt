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
            "spanish",
            "italian",
            "portuguese",
            "turkish",
            "russian",
            "ukrainian",
            "persian",
            "arabic",
            "japanese",
            "chinese",
            
            //Faculties
            "computer science", 
            "electrical engineering", 
            "food technology",
            "nutritional sciences",
            "nursing and health sciences",
            "social and cultural sciences",
            "social work",
            "business economics",
            "accounting, finance, controlling",
            "dietetics",
            "nutritional psychology",
            "food processing",
            "health management",
            "global software development",
            "intercultural communication and european studies",
            "international food business and consumer studies",
            "international management", 
            "oecotrophology",
            "public health",
            "public health nutrition", 
            "supply chain management",
            "sustainable food systems",
            
            //Interests
            "football",
            "table tennis",
            "music",
            "computer games",
            "party",
            "beerpong",
            "bowling",
            "darts",
            "drone racing",
            "cooking",
            "travel",
            "art",
            "dancing",
            "free-climbing",
            "bodybuilding",
            "yoga",
            "photography",
            
            //Sport
            "basketball",
            "soccer",
            "handball",
            "extreme sports",
            "esports",
            
            //Mitbewohner
            "only men",
            "only woman",
            "under 25",
            "under 30",
            "over 30",
            "singles",
            
            //Sexuality
            "heterosexual",
            "homosexual",
            "bisexual",
            
            //Religions
            "catholic",
            "evangelical",
            "orthodox",
            "atheist",
            "islam",
            "hinduism",
            "buddhism",
            "judaism",
            "bahai",
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
