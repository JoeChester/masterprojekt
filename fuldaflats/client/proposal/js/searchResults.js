var resultMap;

var forceNullObservable = function() {
    var obs = ko.observable();

    return ko.computed({
        read: function() {
            return obs();
        },
        write: function(val) {
            if(val === '') {
                val = null;
            }
            obs(val);
        }
    });
};

var model = {
    offers : ko.observableArray([]),
    availableTags: ko.observableArray(['computer science', 'economics']),
    offerTypes: ko.observableArray(['FLAT', 'SHARE', 'SUBLET', 'COUCH', 'PARTY']),
    queryParameter: {
        offerType: forceNullObservable(),
        uniDistance: { lte: forceNullObservable()},
        rent: { lte: forceNullObservable()},
        size: { gte: forceNullObservable()},
        tag: forceNullObservable()
    }
};

function search(){
    var searchQuery = ko.toJSON(model.queryParameter);
    console.log(searchQuery);
    $.ajax({
        url: "/api/offers/search",
        type: "post",
        dataType: "application/json",
        contentType: "application/json",
        data: searchQuery,
        success: function(data, status, req){
            getSearchResults();
        },
        error: function(req, status, err){
            console.log("Error!");
            console.log(err);
        }
    });
}


function getSearchResults(){
    model.offers.removeAll();
    $.ajax({
        url: "/api/offers/search",
        success: function(data, status, req){
            console.log(data);
            for(var i in data){
                model.offers.push(data[i]);
            }
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
    ko.applyBindings(model);

    setupMap();
    getSearchResults();
});