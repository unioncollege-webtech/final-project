var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://password:password@ds131878.mlab.com:31878/ucfinalproject', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(8080, function() {
    console.log('listening on 8080');
  });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', function(req, res) {
  db.collection('logs').find().toArray(function(err, result) {
    if (err) return console.log(err);
    res.render('index.ejs', {logs: result});
  });
});

app.post('/logs', function(req, res) {
  db.collection('logs').save(req.body, function(err, result) {
    if (err) return console.log(err);
    console.log('Saved to mLab.');
    res.redirect('/');
  });
});

app.put('/logs', function(req, res) {
  db.collection('logs')
  .findOneAndUpdate({timestamp:1}, {
    $set: {
      name: 'Admin',
      laps: 'Request has been made to change entry.'
    }
  }, {
    sort: {_id: 1},
    upsert: true
  }, function(err, result) {
    if (err) return res.send(err);
    res.send(result);
  });
});

app.delete('/logs', function(req, res) {
  db.collection('logs').remove.limit(1).sort({timestamp:-1},
  (err, result) => {
    if (err) return res.send(500, err);
    res.send('Deleted last file.');
  });
});
