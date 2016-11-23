var offerTypes = {
    offerTypes: ko.observableArray(['FLAT', 'SHARE', 'SUBLET', 'COUCH', 'PARTY'])
};

var tags = {
    offerTypes: ko.observableArray(['computer science', 'economics'])
};

var queryParameter = {
    offerType: ko.observable(''),
    maxDistance: ko.observable(''),
    maxPrice: ko.observable(''),
    minAreaSize: ko.observable(''),
    tag: ko.observable(''),

    search: function(){
        var self = this;
        console.log(self);
    }
};

$(function() {
    $(".owl-carousel-offers").owlCarousel({
        items: 4,
        itemsDesktopSmall: [990, 3],
        itemsTablet: [768, 2],
        itemsMobile: [480, 1]}
    );

    ko.applyBindings(offerTypes);
    ko.applyBindings(tags);
    ko.applyBindings(queryParameter);
});

function search(){
    var searchQuery = ko.toJSON(queryParameter);
    console.log(searchQuery);
}
