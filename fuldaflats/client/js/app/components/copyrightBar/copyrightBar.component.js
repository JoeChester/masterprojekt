define(['text!./copyrightBar.component.html', 'knockout'], function(componentTemplate, ko) {
    return {
        viewModel: function(params) {
            this.impressumUrl = ko.observable(params.impressumUrl || '');
            this.contactUrl = ko.observable(params.contactUrl || '');
            this.termsOfUseUrl = ko.observable(params.termsOfUseUrl || '');
            this.copyrightDate = ko.observable(params.copyrightDate || '');
            this.copyrightName = ko.observable(params.copyrightName || '');
            this.templateAuthorName = ko.observable(params.templateAuthorName || '');
            this.templateUrl = ko.observable(params.templateUrl || '');
        },
        template: componentTemplate
    };
});