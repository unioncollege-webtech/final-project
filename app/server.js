var express = require('express')

/**NOTE: Atom waypoint options:
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

function newPlayer(pID, callback) {
  //Create temp player var holding the new player
  var thisNewPlayer = new Player({
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
  thisNewPlayer.save(function (err) {
    if (err) return console.error("---WARN---\n\nUser not added:\n\n", err, "\n\n---END WARN---\n")
    else return console.log('New user! Welcome, ' + thisNewPlayer["playerID"] + " to the database!")
    callback();
  })
}

function getPlayerByID(pID,callback) {
  return Player.find({ playerID: pID }, callback)
}

function getPlayersAll() {
  Player.find({}, function(err, players) {
    if (err) throw err;
    console.log(players)
  })
}

function updatePlayer(pID, fieldAndValue) {
  Player.findOneAndUpdate({ playerID: pID }, fieldAndValue, function(err, player) {
    if (err) throw err;
    console.log("Player updated")
  })
}
//updatePlayer('Test2','playerID','TEst3')

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

function hatcheryUpdate(data,socket) {
  getPlayerByID(data.player, function(err, player) {
    if (!player[0]) {
      return
    }
    if (player[0].trumps < player[0].maxTrumps) {
      updatePlayer(player[0].playerID, { trumps: (player[0].trumps + 1) } )
    }
  })
}

function hatcheryMoneyUpdate(data,socket) {
  getPlayerByID(data.player, function(err, player) {
    if (!player[0]) {
      return
    }
    updatePlayer(player[0].playerID, { money: (player[0].money + player[0].trumps) } )
  })
}

function trumpSlotUpdate(data,socket) {
  getPlayerByID(data.player, function(err, player) {
    if (!player[0]) {
      return
    }
    if (player[0].money > 100) {
      updatePlayer(player[0].playerID, { maxTrumps: (player[0].maxTrumps + 1) } )
      updatePlayer(player[0].playerID, { money: (player[0].money - 100) } )
    }
  })
}

function updateAUser(data,socket) {
  getPlayerByID(data.player, function(err, player) {
    if (err) throw err;
    if (player[0]) {
      socket.emit('updatePlayer', {
        trumps: player[0].trumps,
        maxTrumps: player[0].maxTrumps,
        money: player[0].money
      })
    } else {
      socket.emit('updatePlayer', {
        trumps: 0,
        maxTrumps: 1,
        money: 0
      })
    }
  })
}

io.on('connection', function (socket) {
  socket.on('userReqUpdate', function (data) {
    updateAUser(data,socket);
  })
  socket.on('incrementClicked', function(data) {
    if (data.name === "hatchery") {
      getPlayerByID(data.player, function(err, player) {
        if (err) throw err;
        //TODO: Fix this to first CHECK if the player exists, if not then create, instead of just assuming the create will error if exists
        newPlayer(data.player, hatcheryUpdate(data,socket))
      })
    }
    if (data.name === "hatcheryMoney") {
      getPlayerByID(data.player, function(err, player) {
        if (err) throw err;
        //TODO: Fix this to first CHECK if the player exists, if not then create, instead of just assuming the create will error if exists
        newPlayer(data.player, hatcheryMoneyUpdate(data,socket))
      })
    }
    if (data.name === "trumpSlot") {
      getPlayerByID(data.player, function(err, player) {
        if (err) throw err;
        //TODO: Fix this to first CHECK if the player exists, if not then create, instead of just assuming the create will error if exists
        newPlayer(data.player, trumpSlotUpdate(data,socket))
      })
    }
  })
});

// Have the Express application listen for incoming requests on port 8080
server.listen(8080, function() {
  console.log('Trumps server listening on port 8080');
});
