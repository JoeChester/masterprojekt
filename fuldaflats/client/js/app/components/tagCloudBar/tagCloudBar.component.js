define(['text!./tagCloudBar.component.html', "css!./tagCloudBar.component.css", "knockout", 'jqcloud', 'fuldaflatsApiClient'],
    function(componentTemplate, componentCss, ko, jqcloud, api) {
        function TagCloudModel(ko, jqcloud, api) {
            var self = this;

            var tagCloudContainer = ko.observable();
            var tagCloudOptions = ko.observable({});
            var tagCloudDefaultHeight = ko.observable(150);
            var cloudTags = ko.observableArray();
            var searchPageInfo = ko.observableArray();

            function getRandomTagWeight() {
                var min = 1;
                var max = 10;
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            self.showTagClound = function() {
                if (cloudTags().length > 0 && tagCloudContainer()) {

                    if (!tagCloudOptions().height) {
                        tagCloudOptions().height = tagCloudDefaultHeight();
                    }

                    tagCloudOptions().autoResize = true;
                    tagCloudOptions().afterCloudRender = function() {
                        ko.applyBindings(self, tagCloudContainer()[0]);
                    }

                    tagCloudContainer().jQCloud(cloudTags(), tagCloudOptions());
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
                    tagCloudOptions(ko.unwrap(params.tagCloudOptions) || {});
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