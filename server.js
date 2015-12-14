var express = require('express');
var fs = require('fs');
var toDoList = require('./storage.json');

var app = express();
var bodyparser = require('body-parser');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.locals.sitename = 'To Do List:';

app.use(bodyparser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.render('index', {
    title: "To Do's",
    items: toDoList.list
  });
});

app.get('/edit', function(req, res) {
  res.render('edit', {
    title: "To Do's",
    items: toDoList.list
  });
});

app.post('/', function(req, res){
    toDoList.list.push({
        title: req.body.title
    });
    res.redirect('/');
});

app.post('/delete', function(req, res){
    for(var i=toDoList.list.length-1; i>-1; i--){
      if(req.body.title== toDoList.list[i].title){
        toDoList.list.splice(i, 1);
      }
    }
    res.redirect('/');
});

app.post('/edit', function(req, res) {
  toDoList.list = [];
  req.body.items.forEach(function(item){
    toDoList.list.push({
        title: item
    });
  });
  res.redirect('/');
});

app.post('/save', function(req, res){
  fs.writeFile('./storage.json', JSON.stringify(toDoList), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

app.listen(8080);

console.log("The server is up and running!");