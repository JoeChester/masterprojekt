define(['text!./tagCloudBar.component.html', "knockout", 'jqcloud', 'fuldaflatsApiClient'], function(componentTemplate, ko, jqcloud, api) {
    function TagCloudModel(ko, jqcloud, api) {
        var self = this;

        var tagCloudContainer = ko.observable();
        var tagCloudHeight = ko.observable();
        var tagColors = ko.observableArray();
        var cloudTags = ko.observableArray();
        var searchPageInfo = ko.observableArray();

        function getRandomTagWeight() {
            var min = 1;
            var max = 10;
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        self.showTagClound = function() {
            if (cloudTags().length > 0 && tagCloudContainer()) {
                var jqcloudOptions = {
                    height: tagCloudHeight(),
                    autoResize: true,
                    afterCloudRender: function() {
                        ko.applyBindings(self, tagCloudContainer()[0]);
                    }
                }

                if (tagColors().length === 10) {
                    jqcloudOptions.colors = tagColors();
                }

                tagCloudContainer().jQCloud(cloudTags(), jqcloudOptions);
            }
        };

        self.searchByTag = function(tagcloudModel, event) {
            var tag = event.currentTarget.text;
            var queryParameter = api.offer.getSearchQueryParamters();
            if (queryParameter && queryParameter.tag && typeof queryParameter.tag === "function" && searchPageInfo() && searchPageInfo().url) {
                queryParameter.tag(tag);
                api.offer.searchOffer(queryParameter, searchPageInfo().url)
            }
        };

        self.initialize = function(params, containerElement) {
            tagCloudContainer(ko.unwrap(containerElement) || "");

            if (params) {
                searchPageInfo(ko.unwrap(params.searchPageInfo) || "");
                tagCloudHeight(ko.unwrap(params.tagCloudHeight) || 150);

                var paramsTagColors = ko.unwrap(params.tagColors)
                if (paramsTagColors && paramsTagColors.length === 10) {
                    tagColors(paramsTagColors);
                }
            }

            api.offer.getTags().then(function(tagsResult) {
                cloudTags.removeAll()

                $.each(ko.unwrap(tagsResult), function(index, tag) {
                    var tagTitle = "";

                    if (tag && typeof tag === "string") {
                        tagTitle = tag;
                    } else if (tag && tag.title) {
                        tagTitle = tag.title;
                    }

                    if (tagTitle) {
                        cloudTags.push({
                            text: tag,
                            weight: getRandomTagWeight(),
                            link: { href: "javascript:void(0)", "data-bind": "click: searchByTag" },
                        });
                    }
                });

                self.showTagClound();
            });
        }
    }

    return {
        viewModel: {
            createViewModel: function(params, componentInfo) {
                var viewModel = null;

                var templateRoot = $(componentInfo.element);
                if (templateRoot.length > 0) {
                    var tagCloudContainer = templateRoot.find("#tagcloud");
                    if (tagCloudContainer.length > 0) {
                        var viewModel = new TagCloudModel(ko, jqcloud, api);
                        viewModel.initialize(params, tagCloudContainer);
                    }
                }

                return viewModel;
            }
        },
        template: componentTemplate
    };
});