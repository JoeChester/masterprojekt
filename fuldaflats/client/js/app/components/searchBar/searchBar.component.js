define(['text!./searchBar.component.html', 'text!./searchBar.component.css', 'knockout', 'fuldaflatsApiClient'], function(componentTemplate, componentCss, ko, api) {

    function SearchPanelModel(params) {
        var self = this;

        self.offerTypes = ko.observableArray();
        if (params) {
            var paramsOfferTypes = ko.unwrap(params.offerTypes)
            if (paramsOfferTypes && paramsOfferTypes.length > 0) {
                self.offerTypes = ko.observable(paramsOfferTypes);
            }
        }

        self.tags = ko.observableArray();

        api.offer.getTags().then(function(tags) {
            self.tags(ko.unwrap(tags));
        });

        self.queryParameter = {
            offerType: ko.observable(),
            maxDistance: ko.observable(),
            maxPrice: ko.observable(),
            minAreaSize: ko.observable(),
            tag: ko.observable()
        }

        self.search = function() {
            $.cookie('lastSearchQuery', ko.toJSON(self.queryParameter), { expires: 1, path: '/' });
        }

        self.optionsAfterRender = function(option, item) {
            ko.applyBindingsToNode(option, {
                disable: !item
            }, item);
        };
    }

    return {
        viewModel: {
            createViewModel: function(params, componentInfo) {
                var viewModel = new SearchPanelModel(params);
                return viewModel;
            }
        },
        template: componentTemplate
    };
});