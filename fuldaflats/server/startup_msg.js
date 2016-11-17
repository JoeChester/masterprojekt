/************************************************************
 * File:            startup_msg.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     Just a pretty console message
************************************************************/

var chalk = require('chalk');

var ff_startup = function(){
    console.log("");
    console.log(chalk.blue("┌───────────────────────────────────────┐"));
    console.log(chalk.blue("│ ┌─┐┬ ┬┬  ┌┬┐┌─┐┌─┐┬  ┌─┐┌┬┐┌─┐ ┌┬┐┌─┐ │"));
    console.log(chalk.blue("│ ├┤ │ ││   ││├─┤├┤ │  ├─┤ │ └─┐  ││├┤  │"));
    console.log(chalk.blue("│ ┴  └─┘┴─┘─┴┘┴ ┴┴  ┴─┘┴ ┴ ┴ └─┘o─┴┘└─┘ │"));
    console.log(chalk.blue("└───────────────────────────────────────┘"));
    console.log("");
}

module.exports = ff_startup;