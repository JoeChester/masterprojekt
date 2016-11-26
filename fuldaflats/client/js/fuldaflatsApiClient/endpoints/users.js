define(["jquery", 'knockout'], function($, ko) {

    function UsersEndpoint(usersEndpointUrls, offerTypes) {
        var self = this;
        var endpointUrls = usersEndpointUrls;

        // user sign in
        self.signIn = function(email, password) {
            var defer = $.Deferred();

            $.ajax({
                url: endpointUrls.auth,
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: {
                    email: email,
                    password: window.atob(password)
                }
            }).done(function(data, textStatus, jqXHR) {
                if (jqXHR.status === 201) {
                    var userResult = ko.observable({
                        isAuthenticated: true,
                        userData: undefined
                    });
                    defer.resolve(userResult);
                } else {
                    defer.reject("Failed to sing in the user.");
                }
            }).fail(function(jqXHR, textStatus) {
                defer.reject("Failed to sing in the user.");
            });

            return defer.promise();
        };

        // user sign out
        self.signOut = function() {
            var defer = $.Deferred();

            $.ajax({
                url: endpointUrls.auth,
                method: "DELETE",
            }).done(function(data, textStatus, jqXHR) {
                if (jqXHR.status === 204) {
                    var userResult = ko.observable({
                        isAuthenticated: false,
                        userData: undefined
                    });
                    defer.resolve(userResult);
                } else {
                    defer.reject("Failed to sing out the current user.");
                }
            }).fail(function(jqXHR, textStatus) {
                defer.reject("Failed to sing out the current user.");
            });

            return defer.promise();
        };

        // get current User
        self.getMe = function() {
            var defer = $.Deferred();

            $.ajax({
                url: endpointUrls.me,
                method: "GET",
                dataType: "json"
            }).done(function(requestedUserResults) {
                var userResult = ko.observable();
                if (requestedUserResults) {
                    userResult({
                        isAuthenticated: true,
                        userData: requestedUserResults
                    });
                }

                defer.resolve(userResult);
            }).fail(function(jqXHR, textStatus) {
                if (jqXHR.status === 403) {
                    defer.resolve(ko.observable({
                        isAuthenticated: false,
                        userData: undefined
                    }));
                } else {
                    defer.reject("Failed to get the current user.");
                }
            });

            return defer.promise();
        };
    }

    return UsersEndpoint;
});