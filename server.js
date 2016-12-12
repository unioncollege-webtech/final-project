// Require the Express module (https://npmjs.com/package/express)
var express = require('express');

// Create a new express application instance by calling `express()`
var app = express();
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var pug = require('pug');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database connected");
});

app.set('view engine', 'pug');

// Serve files in the 'public' directory with Express's built-in static file server
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
//app.use(cookieParser());


var characterSchema = mongoose.Schema({
    name: String,
    password: String,
    level: Number,
    vitality: Number,
    dexterity: Number,
    strength: Number,
    intelligence: Number,
    agility: Number,
    stealth: Number,
});

var Character = mongoose.model('Character', characterSchema);

// var test = new Character({
//     name: 'Cat',
//     level: 1,
//     vitality: 8,
//     dexterity: 12,
//     strength: 13,
//     intelligence: 6,
//     agility: 6,
//     stealth: 12
// });

// console.log(test.name);

app.post('/charSubmit', function(req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var level = 1;
    var vitality = req.body.vitality;
    var dexterity = req.body.dexterity;
    var strength = req.body.strength;
    var intelligence = req.body.intelligence;
    var agility = req.body.agility;
    var stealth = req.body.stealth;
    
    var query = Character.findOne({ 'name': name, 'password': password});
    
    query.exec(function (err, character) {
        if (err) return console.log(err);
        if (character == null) {
            var newChar = new Character({
                name: name,
                password: password,
                level: level,
                vitality: vitality,
                dexterity: dexterity,
                strength: strength,
                intelligence: intelligence,
                agility: agility,
                stealth: stealth  
            });
            
            newChar.save(function (err, newChar) {
              if (err) return console.error(err);
            });
            
            res.render('charSheet', {
                name: name,
                level: level,
                vitality: vitality,
                dexterity: dexterity,
                strength: strength,
                intelligence: intelligence,
                agility: agility,
                stealth: stealth
            });
        }
        else {
            res.render('failCreate', {
                password: password,
                level: level,
                vitality: vitality,
                dexterity: dexterity,
                strength: strength,
                intelligence: intelligence,
                agility: agility,
                stealth: stealth  
            });
        }
    });
});

app.post('/charLogin', function(req, res) {
    var name = req.body.name;
    var password = req.body.password;
    
    var query = Character.findOne({ 'name': name, 'password': password});
    
    query.exec(function (err, character) {
        if (err) return console.log(err);
        if (character == null) {
            res.redirect('/failLogin.html');
        }
        else {
            res.render('charSheet', {
                name: character.name,
                level: character.level,
                vitality: character.vitality,
                dexterity: character.dexterity,
                strength: character.strength,
                intelligence: character.intelligence,
                agility: character.agility,
                stealth: character.stealth
            });
        }
    });
});

app.post('/charEdit', function(req, res) {
    var name = req.body.name;
    
    var query = Character.findOne({ 'name': name});
    
    query.exec(function (err, character) {
        if (err) return console.log(err);
        if (character == null) {
            res.send('You broke my website! It was working fine when I left it, I swear!');
        }
        else {
            res.render('charEdit', {
                name: character.name,
                password: character.password,
                vitality: character.vitality,
                dexterity: character.dexterity,
                strength: character.strength,
                intelligence: character.intelligence,
                agility: character.agility,
                stealth: character.stealth
            });
        }
    });
});

app.post('/charEditSubmit', function(req, res) {
    var oldname = req.body.oldname;
    var name = req.body.name;
    var password = req.body.password;
    var vitality = req.body.vitality;
    var dexterity = req.body.dexterity;
    var strength = req.body.strength;
    var intelligence = req.body.intelligence;
    var agility = req.body.agility;
    var stealth = req.body.stealth;
    

    var query = Character.findOne({ 'name': name, 'password': password});

    query.exec(function (err, character) {
        if (err) return console.log(err);
        if (character == null) {
            Character.findOneAndUpdate(
            {name: oldname}, 
            {
                name: name,
                password: password,
                vitality: vitality,
                dexterity: dexterity,
                strength: strength,
                intelligence: intelligence,
                agility: agility,
                stealth: stealth
            }, function(err, character) {
                if (err) return console.log(err);
                res.render('charSheet', {
                    name: name,
                    level: 1,
                    vitality: vitality,
                    dexterity: dexterity,
                    strength: strength,
                    intelligence: intelligence,
                    agility: agility,
                    stealth: stealth
                });
            });
        }
        else {
            if (name == oldname) {
                Character.findOneAndUpdate(
                {name: oldname}, 
                {
                    name: name,
                    password: password,
                    vitality: vitality,
                    dexterity: dexterity,
                    strength: strength,
                    intelligence: intelligence,
                    agility: agility,
                    stealth: stealth
                }, function(err, character) {
                    if (err) return console.log(err);
                    res.render('charSheet', {
                        name: name,
                        level: 1,
                        vitality: vitality,
                        dexterity: dexterity,
                        strength: strength,
                        intelligence: intelligence,
                        agility: agility,
                        stealth: stealth
                    });
                });
            }
            else {
                res.render("charEditFail", {
                    name: oldname,
                    password: password,
                    vitality: vitality,
                    dexterity: dexterity,
                    strength: strength,
                    intelligence: intelligence,
                    agility: agility,
                    stealth: stealth
                });
            }
        }
    }
    );
});

app.post('/charDeleteConfirm', function(req, res) {
    var name = req.body.name;
    
    res.render('charDeleteConfirm', {
        name: name,
    });
});

app.post('/charDelete', function(req, res) {
    var name = req.body.name;
    
    var query = Character.findOne({ 'name': name});
    
    query.exec(function (err, character) {
        if (err) return console.log(err);
        if (character == null) {
            res.send('You broke my website! It was working fine when I left it, I swear!');
        }
        else {
            Character.findOneAndRemove(
            {name: name}, 
            function(err, character) {
                if (err) return console.log(err);
                res.render('charDeleted', {
                    name: name 
                });
            });
        }
    });
});

// Have the Express application listen for incoming requests on port 8080
app.listen(8080);

console.log("Server is up!");