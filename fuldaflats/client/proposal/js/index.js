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
            window.location = "/proposal/searchResults";
        },
        error: function(req, status, err){
            console.log("Error!");
            console.log(err);
        }
    });
}

$(function() {
    $(".owl-carousel-offers").owlCarousel({
        items: 4,
        itemsDesktopSmall: [990, 3],
        itemsTablet: [768, 2],
        itemsMobile: [480, 1]}
    );

    ko.applyBindings(model);
});