var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));

app.post('/addrecipe', function (req, res) {
    var recipeName = req.body.recipeName;
    var ing1 = req.body.ing1;
    var ing2 = req.body.ing2;
    var ing3 = req.body.ing3;
    var ing4 = req.body.ing4;
    var ing5 = req.body.ing5;
    var ing6 = req.body.ing6;
    var ing7 = req.body.ing7;
    var ing8 = req.body.ing8;
    var ing9 = req.body.ing9;

    var mongodb = require('mongodb');
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost:27017/db", function(err, db) {
        if(!err) {
            console.log("We are connected");
        }
        var collection = db.collection(recipeName);
        
        // Insert a single document
        collection.insert({ingredient: ing1});
        collection.insert({ingredient: ing2});
        collection.insert({ingredient: ing3});
        collection.insert({ingredient: ing4});
        collection.insert({ingredient: ing5});
        collection.insert({ingredient: ing6});
        collection.insert({ingredient: ing7});
        collection.insert({ingredient: ing8});
        collection.insert({ingredient: ing9});
        // Wait for a second before finishing up, to ensure we have written the item to disk
        setTimeout(function() {
            // var item = []
            // collection.find().forEach(function(u) { item.push(u.ingredient); })
            var list = [];
            for (var i = 1; i < 10; i++) {
                var ingI = "ing" + i;
                collection.findOne({ingredient: ingI}, function(err, item) { 
                    list = list + " " + item;
                    db.close();
                })
            }
            res.send(list);
        }, 100);
    });

});

// Sets the server to listen on port 8080
app.listen(8080);
console.log('server is up');
