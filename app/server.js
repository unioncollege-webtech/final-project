var express = require('express')

/**XXX: Atom waypoint options:
TODO
FIXME
CHANGED
XXX
IDEA
HACK
NOTE
REVIEW
NB
BUG
**/

//NOTE: Client should send only if still connected - server should do all calculations
/**TODO:
 * Add in socket.io stuff so can interact with DB
 * Hook in DB with this thingie
 * IDEA: Hook in way to differentiate users without having to make login...
**/

// Create a new express application instance by calling `express()`
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//Databases n stuff
console.log("[INFO] MongoDB must already be running")
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/trumpsPlayerData')

var Schema = mongoose.Schema;

//Scheming
var playerSchema = new Schema({
  playerID: { type: String, required: true, unique: true },
  trumps: Number,
  maxTrumps: Number,
  money: Number,
  areas: [{
    name: String,
    materials: Array,
    buildings: Array
  }]
})

var Player = mongoose.model('Player', playerSchema)

function newPlayer(pID) {
  //Create temp player var holding the new player
  var newPlayer = new Player({
    playerID: pID,
    trumps: 1,
    maxTrumps: 1,
    money: 0,
    areas: [{
      name: "mine",
      materials: ["Tacos",0,"Ore",0,"Trumpets",0],
      buildings: ["Trump Hatchery",0,"Great America Mining",0,"TrumpCo TaCo Farm",0,"Trumpet Manufactory",0]
    }]
  })
  //Save temp player var to DB to make permanent
  newPlayer.save(function (err) {
    if (err) return console.error("---WARN---\n\nUser not added:\n\n", err, "\n\n---END WARN---\n")
    else return console.log('New user! Welcome, ' + newPlayer["playerID"] + " to the database!")
  })
}
newPlayer("Test2")

function getPlayersByID(pID) {
  return Player.find({ playerID: pID }, function(err, player) {
    if (err) throw err;
    return player
  })
}

function getPlayersAll() {
  Player.find({}, function(err, players) {
    if (err) throw err;
    console.log(players)
  })
}
getPlayersAll()

function updatePlayer(pID, field_to_update, updated_value) {
  return Player.findOneAndUpdate({ playerID: pID }, { field_to_update: updated_value }, function(err, player) {
    if (err) throw err;
    return player[pID]
  })
}

function deletePlayer(pID) {
  return Player.findOneAndRemove({ playerID: pID }, function(err, player) {
    if (err) throw err;
    return "Player successfully deleted"
  })
}

//Templating
app.set('view engine', 'pug');

// Serve files in the 'public' directory with Express's built-in static file server
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
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
  console.log('Trumps server listening on port 8080');
});
