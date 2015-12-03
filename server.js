var express = require('express');

var app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.locals.sitename = 'To Do List:';

var toDoList = [];


app.get('/', function(req, res) {
  res.render('index', {
    title: "To Do's",
    items: toDoList
  });
});

//app.post();


app.listen(8080);

console.log("The server is up and running!");