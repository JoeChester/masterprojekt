define([
    'knockout',
    'app/components/searchBar/searchBar.component',
], function (ko, searchBarComponent) {
    function SearchResultPageModule() {
        var self = this;

        ko.components.register("search", searchBarComponent);

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


