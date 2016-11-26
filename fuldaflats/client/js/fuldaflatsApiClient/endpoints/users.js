define(["jquery", 'knockout'], function ($, ko) {

    function UsersEndpoint(usersEndpointUrls, offerTypes) {
        var self = this;
        var endpointUrls = usersEndpointUrls;

        self.getMe = function () {
            var defer = $.Deferred();

            $.ajax({
                url: endpointUrls.me,
                method: "GET",
                dataType: "json"
            }).done(function (requestedUserResults) {
                var userResult = ko.observable();
                console.log(requestedUserResults);
                if (requestedUserResults) {
                    userResult(requestedUserResults);
                }

                defer.resolve(userResult);
            }).fail(function (jqXHR, textStatus) {
                if (jqXHR.status === 403) {
                    defer.resolve(ko.observable());
                } else {
                    defer.reject("Failed to get the current user.");
                }

            });

            return defer.promise();
        }
    }

    return UsersEndpoint;
});