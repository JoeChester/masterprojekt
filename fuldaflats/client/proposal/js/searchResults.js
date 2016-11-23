var resultMap;

function getSearchResults(){
    $.ajax({
        url: "/api/offers/search",
        success: function(data, status, req){
            console.log(data);
        },
        error: function(req, status, err){

        }
    });
}

function setupMap(){
    resultMap = L.map('resultMap').setView([50.5647986, 9.6828528], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 11,
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(resultMap);
}

$(function() {
    setupMap();
    getSearchResults();
});