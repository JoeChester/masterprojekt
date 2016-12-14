/************************************************************
 * File:            modelTests.js
 * Author:          Jonas Kleinkauf
 * LastMod:         12.12.2016
 * Description:     Playground file for testing backend 
 *                  functions
 * Usage:           node modelTests.js
************************************************************/

var schema = require('../models');
let request = require("request");
let querystring = require('querystring');
let utf8 = require('utf8');

schema.models.Favorite.create({
    userId: 1,
    offerId: 5
}, (err, fav) =>{
    console.log("created favorite!");
})



let streetHnr = "Kreuzeichenstraße 1"
let zip = "36286"
let city = "Neuenstein"

let searchQuery = "http://nominatim.openstreetmap.org/search?street=" + streetHnr + "&postalcode=" + zip + "&city=" + city +"&format=json"
searchQuery = utf8.encode(searchQuery)

request(searchQuery, function (error, response, body) {
    let result = JSON.parse(body)[0]
    console.log(result.lat)
    console.log(result.lon)
});