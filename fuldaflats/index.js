//Require Setup
var chalk = require('chalk');
var config = require('./config.json')[process.env.NODE_ENV || 'development'];
var app = require('./server/endpoints');
var startup_msg = require('./server/startup_msg');

//Startup Message
startup_msg();

//Startup Express Application
console.log("Starting Express App...");
app.listen(config.express.port, function () {
    console.log('Started Server on Port ' 
        + config.express.port + '. ' 
        + chalk.blue('Have fun! :)')
    );
});