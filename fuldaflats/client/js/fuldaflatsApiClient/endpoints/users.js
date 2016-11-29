define(["jquery", 'knockout'], function ($, ko) {

    function UsersEndpoint(usersEndpointUrls, offerTypes) {
        var self = this;
        var endpointUrls = usersEndpointUrls;

        // sign up

        self.signUp = function (signUpData) {
            var defer = $.Deferred();

            if (signUpData) {

                $.ajax({
                    url: endpointUrls.users,
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    data: ko.toJSON(signUpData)
                }).done(function (data, textStatus, jqXHR) {
                    if (jqXHR.status === 201 && data) {
                        var userResult = ko.observable({
                            isAuthenticated: true,
                            userData: data
                        });
                        defer.resolve(userResult);
                    } else {
                        defer.reject("Failed to sing in the user.");
                    }
                }).fail(function (jqXHR, textStatus) {
                    /*             var userResult = ko.observable({
                                     isAuthenticated: true,
                                     userData: {
                                         "id": 4,
                                         "email": "louisa1991@gmx.de",
                                         "type": 1,
                                         "firstName": "Louisa",
                                         "lastName": "Buehler",
                                         "birthday": "20.06.1991",
                                         "upgradeDate": "25.11.2016",
                                         "creationDate": "19.11.2016",
                                         "phoneNumber": "(+49) 661 100 812",
                                         "zipCode": "36039",
                                         "city": "Fulda",
                                         "street": "Henrich Str.",
                                         "houseNumber": "30",
                                         "gender": "female",
                                         "officeAddress": null,
                                         "averageRating": 4.8,
                                         "favorites": null
                                     }
                                 });
                                 defer.resolve(userResult)*/
                    defer.reject("Failed to sing up the user.");
                });
            } else {
                defer.reject("Empty sign up data.");
            }

            return defer.promise();
        }

        // user sign in
        self.signIn = function (email, password) {
            var defer = $.Deferred();
            var userCredentials = {
                email: email,
                password: password
            };

            $.ajax({
                url: endpointUrls.auth,
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(userCredentials)
            }).done(function (data, textStatus, jqXHR) {
                if (jqXHR.status === 200 && data) {
                    var userResult = ko.observable({
                        isAuthenticated: true,
                        userData: data
                    });
                    defer.resolve(userResult);
                    executeLoginCallbacks();
                } else {
                    defer.reject("Failed to sing in the user.");
                }
            }).fail(function (jqXHR, textStatus) {
                /*                var userResult = ko.observable({
                                    isAuthenticated: true,
                                    userData: {
                                        "id": 4,
                                        "email": "louisa1991@gmx.de",
                                        "type": 1,
                                        "firstName": "Louisa",
                                        "lastName": "Buehler",
                                        "birthday": "20.06.1991",
                                        "upgradeDate": "25.11.2016",
                                        "creationDate": "19.11.2016",
                                        "phoneNumber": "(+49) 661 100 812",
                                        "zipCode": "36039",
                                        "city": "Fulda",
                                        "street": "Henrich Str.",
                                        "houseNumber": "30",
                                        "gender": "female",
                                        "officeAddress": null,
                                        "averageRating": 4.8,
                                        "favorites": null
                                    }
                                });
                                defer.resolve(userResult)*/
                defer.reject("Failed to sing in the user.");
            });

            return defer.promise();
        };

        // user sign out
        self.signOut = function () {
            var defer = $.Deferred();

            $.ajax({
                url: endpointUrls.auth,
                method: "DELETE",
            }).done(function (data, textStatus, jqXHR) {
                if (jqXHR.status === 204) {
                    var userResult = ko.observable({
                        isAuthenticated: false,
                        userData: undefined
                    });
                    defer.resolve(userResult);
                    executeLoginCallbacks();
                    window.location = "/";
                } else {
                    defer.reject("Failed to sing out the current user.");
                }
            }).fail(function (jqXHR, textStatus) {
                defer.reject("Failed to sing out the current user.");
            });

            return defer.promise();
        };

        // get current User
        self.getMe = function () {
            var defer = $.Deferred();

            $.ajax({
                url: endpointUrls.me,
                method: "GET"
            }).done(function (requestedUserResults) {
                var userResult = ko.observable();
                if (requestedUserResults) {
                    userResult({
                        isAuthenticated: true,
                        userData: requestedUserResults
                    });
                }

                defer.resolve(userResult);
            }).fail(function (jqXHR, textStatus) {
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