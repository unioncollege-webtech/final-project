var express = require('express');
var Notes = require('./storage.json');
var app = express();
var bodyparser = require('body-parser');
var fs = require('fs');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.locals.sitename = "Today's Notes";

app.use(bodyparser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.render('index', {
    title: "Note",
    items: Notes.list
  });
});

app.get('/edit', function(req, res) {
  res.render('edit', {
    title: "Note",
    items: Notes.list
  });
});

app.post('/', function(req, res){
    Notes.list.push({
        title: req.body.title
    });
    res.redirect('/');
});

app.post('/delete', function(req, res){
    for(var i=Notes.list.length-1; i>-1; i--){
      if(req.body.title== Notes.list[i].title){
        Notes.list.splice(i, 1);
      }
    }
    res.redirect('/');
});

app.post('/edit', function(req, res) {
  Notes.list = [];
  req.body.items.forEach(function(item){
    Notes.list.push({
        title: item
    });
  });
  res.redirect('/');
});

app.post('/save', function(req, res){
  fs.writeFile('./storage.json', JSON.stringify(Notes), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

app.listen(8080);

console.log("Server is Up");