var express = require('express');
var app = express();
var longpoll = require("express-longpoll")(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Creates app.get("/poll") for the long poll
longpoll.create("/poll");

app.listen(8080, function() {
    console.log("Listening on port 8080");
});

var data = { text: "Some data" };

// Publishes data to all clients long polling /poll endpoint
// You need to call this AFTER you make a GET request to /poll
longpoll.publish("/poll", data);

// Publish every 5 seconds
setInterval(function () {
    longpoll.publish("/poll", data);
}, 5000);
