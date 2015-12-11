var express = require('express');

var app = express();
var bodyparser = require('body-parser');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.locals.sitename = 'To Do List:';

app.use(bodyparser.urlencoded({
  extended: false
}));

var toDoList = [];


app.get('/', function(req, res) {
  res.render('index', {
    title: "To Do's",
    items: toDoList
  });
});

app.post('/', function(req, res){
    toDoList.push({
        title: req.body.title
    });
    res.redirect('/');
});

app.post('/delete', function(req, res){
    for(var i=toDoList.length-1; i>-1; i--){
      if(req.body.title== toDoList[i].title){
        toDoList.splice(i, 1);
      }
    }
    res.redirect('/');
});

app.post('/update', function(req, res) {
    
})

// app.post('toDoItem', function(req, res) {
//     toDoList.push({
//         title: req.body.title
//     });
//     res.render('toDoItem', {
//         title: "search",
//         items: "toDoList"
//     });

app.listen(8080);

console.log("The server is up and running!");