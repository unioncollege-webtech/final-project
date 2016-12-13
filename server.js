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
app.use(express.static(__dirname + '/public'));


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

app.put('/logs', (req, res) => {
  db.collection('logs')
  .findOneAndUpdate({}, {
    $set: {
      laps: 'Request to update information'
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

app.delete('/logs', (req, res) => {
  db.collection('logs').findOneAndDelete({},
  (err, result) => {
    if (err) return res.send(500, err);
    res.send('One log deleted.');
  });
});

