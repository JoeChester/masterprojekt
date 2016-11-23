define([
    'knockout',
    'app/components/searchBar/searchBar.component',
    'app/components/searchResultBar/searchResultBar.component',
], function (ko, searchBarComponent, searchResultBarComponent) {
    function SearchResultPageModule() {
        var self = this;

        ko.components.register("search", searchBarComponent);
        ko.components.register("search-results", searchResultBarComponent);

        self.initialize = function (appModel) {
            if (appModel) {
                appModel.currentPage = appModel.pages.search;

                appModel.searchPanelBar = {
                    offerTypes: appModel.offerTypes,
                    searchPageInfo: appModel.pages.search
                }
            }
        };
    };

    return new SearchResultPageModule();
});


