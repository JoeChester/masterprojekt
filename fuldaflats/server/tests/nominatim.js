let request = require("request");
let querystring = require('querystring');
let utf8 = require('utf8');

let streetHnr = "Kreuzeichenstrfe 25"
let zip = "36286"
let city = "Neuenstein"

let searchQuery = "http://nominatim.openstreetmap.org/search?street=" + streetHnr + "&postalcode=" + zip + "&city=" + city +"&format=json"
searchQuery = utf8.encode(searchQuery)

request(searchQuery, function (error, response, body) {
    let result = JSON.parse(body)[0]
    console.log(result.lat)
    console.log(result.lon)
});