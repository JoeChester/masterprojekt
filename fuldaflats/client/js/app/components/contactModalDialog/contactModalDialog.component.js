define(['text!./contactModalDialog.component.html', 'css!./contactModalDialog.component.css', 'knockout', 'jquery'],
    function (componentTemplate, componentCss, ko, $) {
        function ContactInModel($, ko, api) {
            var self = this;

            self.initialize = function (params, dialogContainer) {

            };
        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var viewModel = null;

                    var templateRoot = $(componentInfo.element);
                    if (templateRoot.length > 0) {
                        var contactDialog = templateRoot.find("#contactModalDialog");
                        if (contactDialog.length > 0) {
                            var contact = new ContactInModel($, ko, api);
                            contact.initialize(params, contactDialog);
                        }
                    }

                    return contact;
                }
            },
            template: componentTemplate
        };
    });