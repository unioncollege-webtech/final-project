const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://booktrack:booktrack1@ds133428.mlab.com:33428/kondkidsbooktrack', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT || 8080, () => {
    console.log('listening on 8080');
  });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {books: result});
  });
});

app.post('/books', (req, res) => {
  db.collection('books').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});

app.put('/books', (req, res) => {
  db.collection('books')
  .findOneAndUpdate({name:'Title'}, {
    $set: {
      name: req.body.name,
      book: req.body.book
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

app.delete('/books', (req, res) => {
  db.collection('books').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err);
    res.send('The book title you chose just got deleted');
  });
})