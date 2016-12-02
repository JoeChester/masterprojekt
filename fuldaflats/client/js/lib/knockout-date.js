(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["knockout", "moment"], factory);
    } else {
        factory(window.ko, moment);
    }
})(function (ko, moment) {
    ko.bindingHandlers.date = {
        init: function (element, valueAccessor) {
            var dateConverter = ko.computed({
                read: function () {
                    var returnValue = "";
                    var currentValue = ko.unwrap(valueAccessor);
                    if (currentValue instanceof Date) {
                        return moment(currentValue).format("YYYY-MM-DD");
                    }
                    return returnValue;
                },
                write: function (newValue) {
                    if (newValue) {
                        valueAccessor()(new Date(newValue));
                    }
                }
            });

            ko.applyBindingsToNode(element, { value: dateConverter });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var currentValue = ko.unwrap(valueAccessor);
            if (currentValue instanceof Date) {
                element.value = moment(currentValue).format("YYYY-MM-DD");
            }
        }
    };
});
