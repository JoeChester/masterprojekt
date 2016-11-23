define(['text!./tagCloudBar.component.html', "knockout", 'jqcloud', 'fuldaflatsApiClient'], function(componentTemplate, ko, jqcloud, api) {
    function TagCloudModel(params, tagCloudElement) {
        var self = this;
        var tagCloudHeight = ko.observable();
        var tagColors = ko.observableArray();
        var cloudTags = ko.observableArray();

        if (params) {
            tagCloudHeight(ko.unwrap(params.tagCloudHeight) || 150);

            var paramsTagColors = ko.unwrap(params.tagColors)
            if (paramsTagColors && paramsTagColors.length > 0) {
                tagColors(paramsTagColors);
            }
        }

        function getRandomTagWeight() {
            var min = 1;
            var max = 10;
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        api.offer.getTags().then(function(tagsResult) {
            cloudTags.removeAll()
            $.each(ko.unwrap(tagsResult), function(index, tag) {
                if (tag && tag.title) {
                    cloudTags.push({
                        text: tag.title,
                        weight: getRandomTagWeight(),
                        link:"/pages/search.html"
                    });
                }
            })
            if (cloudTags().length > 0) {
                var jqcloudOptions = {
                    height: tagCloudHeight(),
                    autoResize: true
                }
                if (tagColors().length > 0) {
                    jqcloudOptions.colors = tagColors();
                }
                tagCloudElement.jQCloud(cloudTags(), jqcloudOptions);
            }
        });
    }

    return {
        viewModel: {
            createViewModel: function(params, componentInfo) {
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