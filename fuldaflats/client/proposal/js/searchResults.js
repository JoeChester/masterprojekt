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

$(function() {
    getSearchResults();
});