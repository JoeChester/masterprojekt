define(['text!./becomeLandlordBar.component.html', 'css!./becomeLandlordBar.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        function BecomeLandlordModel(params) {
            var self = this;
            self.currentUser = ko.observable();
            self.testBinding = ko.observable('myBinding');

            $.getJSON({
                url: '/api/users/me',
                success: function (data, status, req) {
                    console.log(data);
                    self.currentUser(data);
                }
            });

            self.showTab = function (scope, event) {
                event.preventDefault()
                $(event.currentTarget).tab('show')
            }
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    return new BecomeLandlordModel(params);
                }
            },
            template: componentTemplate
        };
    });