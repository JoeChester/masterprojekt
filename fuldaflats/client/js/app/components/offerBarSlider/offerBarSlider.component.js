define(['text!./offerBarSlider.component.html', 'css!./offerBarSlider.component.css', 'knockout'], function (componentTemplate, componentCss, ko) {
    return {
        viewModel: function (params) {
            var self = this;
            self.owlCarouselOptions = {};
            self.barTitle = ko.observable();
            self.offers = ko.observableArray();

            if (params) {
                self.barTitle(ko.unwrap(params.barTitle || ''));

                var paramOffers = ko.unwrap(params.offers);
                if (paramOffers && paramOffers.length > 0) {
                    self.offers(paramOffers);
                }

                self.owlCarouselOptions = ko.unwrap(params.owlCarouselOptions);
            }
        },
        template: componentTemplate
    };
}); 