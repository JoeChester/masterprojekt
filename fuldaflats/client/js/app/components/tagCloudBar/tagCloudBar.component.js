define(['text!./tagCloudBar.component.html', "knockout", 'jqcloud', 'fuldaflatsApiClient'], function (componentTemplate, ko, jqcloud, api) {
    function TagCloudModel(params, tagCloudElement) {
        var self = this;

        var tagCloudHeight = ko.observable();
        var tagColors = ko.observableArray();
        var cloudTags = ko.observableArray();

        if (params) {
            tagCloudHeight(ko.unwrap(params.tagCloudHeight) || 150);

            var paramsTagColors = ko.unwrap(params.tagColors)
            if (paramsTagColors && paramsTagColors.length === 10) {
                tagColors(paramsTagColors);
            }
        }

        function getRandomTagWeight() {
            var min = 1;
            var max = 10;
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        api.offer.getTags().then(function (tagsResult) {
            cloudTags.removeAll()

            $.each(ko.unwrap(tagsResult), function (index, tag) {
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

        self.showTagClound = function () {
            if (cloudTags().length > 0 && tagCloudElement) {
                var jqcloudOptions = {
                    height: tagCloudHeight(),
                    autoResize: true,
                    afterCloudRender: function () {
                        ko.applyBindings(self, tagCloudElement[0]);
                    }
                }

                if (tagColors().length === 10) {
                    jqcloudOptions.colors = tagColors();
                }

                tagCloudElement.jQCloud(cloudTags(), jqcloudOptions);
            }
        };

        self.searchByTag = function (tagcloudModel, event) {
            console.log(event.currentTarget.text);
        }
    }

    return {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var viewModel = null;

                var templateRoot = $(componentInfo.element);
                if (templateRoot.length > 0) {
                    var tagcloud = templateRoot.find("#tagcloud");
                    if (tagcloud.length > 0) {
                        var viewModel = new TagCloudModel(params, tagcloud);
                    }
                }

                return viewModel;
            }
        },
        template: componentTemplate
    };
});