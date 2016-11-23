define(['text!./searchResultBar.component.html', 'text!./searchResultBar.component.css', 'knockout', 'jquery', 'fuldaflatsApiClient'],
    function (componentTemplate, componentCss, ko, $, api) {
        function SearchResultModel() {

        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    var viewModel = new SearchResultModel(params);
                    return viewModel;
                }
            },
            template: componentTemplate
        };
    });