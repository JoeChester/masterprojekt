/************************************************************
 * File:            roboflatspectionBar.component.js
 * Author:          Michelle Rothenbücher, Jonas Kleinkauf
 * LastMod:         17.02.2017
 * Description:     JS Component Handler roboflatspection Bar
 ************************************************************/

define(['text!./roboflatspectionBar.component.html', 'css!./roboflatspectionBar.component.css', 'knockout', 'jquery', 'lightbox', 'moment'],
    function (componentTemplate, componentCss, ko, $, lightbox, moment) {

        function RoboFlatspectionModel(params) {

            moment.locale('de');

            var self = this;

            // your model functions and variables
            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            };

            self.currentUser = ko.observable({
                isAuthenticated: false,
                userData: undefined
            });

            self.isAuthenticated = ko.observable(false);
            self.offerId = ko.observable();

            //Check Login
            self.checkLogin = function () {
                $.ajax({
                    method: "GET",
                    url: "/api/users/me",
                    contentType: "application/json",
                    success: function (data, status, req) {
                        self.currentUser(data);
                        self.isAuthenticated(true);
                    },
                    error: function (req, status, error) {
                        self.currentUser({});
                        self.isAuthenticated(false);
                    }
                });
            }

            loginCallbacks.push(self.checkLogin);
            self.checkLogin();

            //Get Offer Data
            self.offerId(getURLParameter("offerId") || "");
            if (self.offerId()) {
                //self.getOfferDetails();
            }

            //loginCallbacks.push(self.getOfferDetails);

            //Robot Control functions
            self.isConnected = ko.observable(false);
            self.socket = null;
            self.connectRobo = function () {
                    self.socket = new WebSocket("ws://fuldaflats.de:4747");
                    self.socket.binaryType = "arraybuffer";
                    self.socket.onopen = function () {
                        console.log("Connected!");
                        self.isConnected(true);
                        self.socket.send(JSON.stringify({
                            type: "WEB",
                            body: 1
                        })); //todo: read query and repace offerId
                    }

                    self.socket.onmessage = function (e) {
                        if (typeof e.data == "string") {
                            console.log("Text message received: " + e.data);
                        }
                    }

                    self.socket.onclose = function (e) {
                        console.log("Connection closed.");
                        self.socket = null;
                        self.isConnected(false);
                    }
                }
                //Actually connect
            self.connectRobo();

            self.sendCommand = function (cmd) {
                if (self.isConnected()) {
                    self.socket.send(JSON.stringify({
                        type: "CMD",
                        body: cmd
                    }));
                } else {
                    console.log("Connection not opened.");
                }
            }

            //Motor + Dir Controls
            self.forward = function () {
                self.sendCommand("FW");
            }

            self.backward = function () {
                self.sendCommand("BW");
            }

            self.turnLeft = function () {
                self.sendCommand("LEFT");
            }

            self.turnRight = function () {
                self.sendCommand("RIGHT");
            }

            self.turnHome = function () {
                self.sendCommand("HOME");
            }

            //Camera Controls
            self.camUp = function () {
                self.sendCommand("CAMUP");
            }

            self.camDown = function () {
                self.sendCommand("CAMDOWN");
            }

            self.camLeft = function () {
                self.sendCommand("CAMLEFT");
            }

            self.camRight = function () {
                self.sendCommand("CAMRIGHT");
            }

            self.camHome = function () {
                self.sendCommand("CAMHOME");
            }

            self.stop = function () {
                self.sendCommand("STOP");
            }

            //Using Keys:
            window.onkeypress = function (e) {
                if (e.key == "w") {
                    self.sendCommand("FW");
                    self.sendCommand("STRAIGHT");
                    return
                }
                if (e.key == "s") {
                    self.sendCommand("BW");
                    return
                }
                if (e.key == "a") {
                    self.sendCommand("LEFT");
                    return
                }
                if (e.key == "d") {
                    self.sendCommand("RIGHT");
                    return
                }

                if (e.key == "u") {
                    self.sendCommand("CAMUP");
                    return
                }

                if (e.key == "j") {
                    self.sendCommand("CAMDOWN");
                    return
                }

                if (e.key == "h") {
                    self.sendCommand("CAMLEFT");
                    return
                }

                if (e.key == "k") {
                    self.sendCommand("CAMRIGHT");
                    return
                }

                if (e.key == "o") {
                    self.sendCommand("CAMHOME");
                    return
                }
            };

            window.onkeyup = function (e) {
                if (e.key == "w" || e.key == "s") {
                    self.sendCommand("STOP");
                    return
                }
                if (e.key == "a" || e.key == "d") {
                    self.sendCommand("HOME");
                    return
                }
            }

            //Stop the robot whenever mouse is released
            document.onmouseup = self.stop

        }

        return {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    // componentInfo contains for example the root element from the component template
                    var roboFlatspection = new RoboFlatspectionModel();
                    window.roboFlatspection = roboFlatspection;
                    return roboFlatspection;
                }
            },
            template: componentTemplate
        };
    });