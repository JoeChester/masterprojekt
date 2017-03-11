/************************************************************
 * File:            roboflatspectionBar.component.js
 * Author:          Michelle Rothenbücher, Jonas Kleinkauf
 * LastMod:         17.02.2017
 * Description:     JS Component Handler roboflatspection Bar
 ************************************************************/

define(['text!./roboflatspectionBar.component.html', 'css!./roboflatspectionBar.component.css', 'knockout', 'jquery', 'lightbox', 'moment', 'jsmpeg', 'fastclick'],
    function (componentTemplate, componentCss, ko, $, lightbox, moment, jsmpeg, fastclick) {

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

            self.streamplayer = null;
            self.connectRobo = function () {
                var canvas = document.getElementById('robostream-canvas');
                var url = 'wss://fuldaflats.de:4747'; //TODO: bind in config

                JSMpeg.Source.WebSocket.prototype.onOpen = function () {
                    this.progress = 1;
                    this.established = true;
                    self.isConnected(true);
                    console.log("Injected Some Code here!");
                    this.socket.send(JSON.stringify({
                        type: "WEB",
                        body: 1//todo: read query and repace offerId
                    }));
                }

                JSMpeg.Source.WebSocket.prototype.onClose = function () {
                    self.isConnected(false);
                    if (this.shouldAttemptReconnect) {
                        clearTimeout(this.reconnectTimeoutId);
                        this.reconnectTimeoutId = setTimeout(function () {
                            this.start();
                        }.bind(this), this.reconnectInterval * 1000);
                    }
                }

                self.streamplayer = new JSMpeg.Player(url, { canvas: canvas });
            }
            //Actually connect
            self.connectRobo();

            self.sendCommand = function (cmd) {
                if (self.isConnected()) {
                    self.streamplayer.source.socket.send(JSON.stringify({
                        type: "CMD",
                        body: cmd
                    }));
                } else {
                    console.log("Connection not opened.");
                }
            }

	        window.addEventListener('load', function () {
		        FastClick.attach(document.body);
	        }, false);

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