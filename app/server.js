var express = require('express')

// Create a new express application instance by calling `express()`
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//Databases n stuff
var redis = require("redis");
var redisClient = redis.createClient();
redisClient.on("error", function (err) {
  console.log("Error " + err);
});

//Templating
app.set('view engine', 'pug');

// Serve files in the 'public' directory with Express's built-in static file server
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: "hey", message: "hello" });
});

io.on('connection', function (socket) {
  /**
  io.emit('resLimResponse', { status: limitingResponses });
  socket.on('limits', function (data) {
    if (data.toggle) {
      if (limitingResponses == true) {
        limitingResponses = false;
      } else {
        limitingResponses = true;
      }
      io.emit('resLimResponse', { status: limitingResponses });
    }
  });
  **/
});

// Have the Express application listen for incoming requests on port 8080
server.listen(8080, function() {
  console.log('Puppies v Kittens server listening on port 8080');
  console.log('[INFO] Redis server must be running already for server to connect.');
  redisClient.on('connect', function() {
    console.log('Connected to redis server');
    try {
      /**
      redisClient.setnx('puppyVotes', 0);
      getMessageByKey('puppyVotes', function (data) {
        ScoreCounter.set('puppies', data);
        console.log("Puppies: " + ScoreCounter.retrieve('puppies'));
      });
      redisClient.setnx('kittenVotes', 0);
      getMessageByKey('kittenVotes', function (data) {
        ScoreCounter.set('kittens', data);
        console.log("Kittens: " + ScoreCounter.retrieve('kittens'));
      });
      redisClient.SMEMBERS('votedIPs', function(err, reply) {
        votedIPs = reply;
        console.log('Loaded already voted IPs from database.');
      });
      **/
    }
    catch (err) {
      console.log('Error See: ' + err);
    }
  });
});

/**
var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app running at http://%s:%s', address.address, address.port)
})**/
