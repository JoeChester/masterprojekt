/************************************************************
 * File:            users.js
 * Author:          Patrick Hasenauer, Jonas Kleinkauf
 * LastMod:         02.12.2016
 * Description:     Javascript api client endpoints for users.
 ************************************************************/
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
                        console.error("Failed to sing up the current user. Invalid response data.");
                        defer.reject(jqXHR);
                    }
                }).fail(function (jqXHR, textStatus) {
                    console.error("Failed to sing up the current user. Sign Up request failed.");
                    defer.reject(jqXHR);
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
                data: ko.toJSON(userCredentials)
            }).done(function (data, textStatus, jqXHR) {
                if (jqXHR.status === 200 && data) {
                    var userResult = ko.observable({
                        isAuthenticated: true,
                        userData: data
                    });
                    defer.resolve(userResult);
                    executeLoginCallbacks();
                } else {
                    console.error("Failed to sing in the current user. Invalid response data.");
                    defer.reject(jqXHR);
                }
            }).fail(function (jqXHR, textStatus) {
                if (jqXHR.status !== 403) {
                    console.error("Failed to sing in the current user. Sign In request failed.");
                }

                defer.reject(jqXHR);
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
                    console.error("Failed to sing out the current user. Invalid response data.");
                    defer.reject(jqXHR);
                }
            }).fail(function (jqXHR, textStatus) {
                console.error("Failed to sing out the current user. Sign Out request failed.");
                defer.reject(jqXHR);
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
                    defer.resolve(userResult);
                } else {
                    console.error("Failed to get the current user profile. Invalid response data.");
                    defer.reject(jqXHR);
                }
            }).fail(function (jqXHR, textStatus) {
                if (jqXHR.status === 403) {
                    defer.resolve(ko.observable({
                        isAuthenticated: false,
                        userData: undefined
                    }));
                } else {
                    console.error("Failed to get the current user. User profile request failed.");
                    defer.reject(jqXHR);
                }
            });

            return defer.promise();
        };
    }

    return UsersEndpoint;
});