/************************************************************
 * File:            gh_autodeploy.js
 * Author:          Jonas Kleinkauf
 * LastMod:         17.11.2016
 * Description:     Automatic deployment server, connected
 *                  to GitHub Respository, used for
 *                  continueous deployment
 * Use:             (sudo) pm2 gh_autodeploy.js --name="gh_autodeploy"
************************************************************/

var http = require('http')
var createHandler = require('github-webhook-handler')
var exec = require('child_process').exec;

var handler = createHandler({ path: '/webhook', secret: 'Fulda#Flats#2016#' })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7767)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)

  //execute pull
  exec('sh gh_autodeploy.sh',
  function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    });
})