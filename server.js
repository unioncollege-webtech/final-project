var express = require('express');
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var exphbs = require('express3-handlebars');
var recipes = require("./routes/recipes");

var dbName = 'recipe';
var dbConnect = "mongodb://localhost:27017/" + dbName;
mongoose.connect(dbConnect);

app.engine('handlebars',
    exphbs ({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res){
    res.render('index');
});




app.use('public', express.static('public'));

app.use('final-project', express.static('final-project'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', recipes);
app.listen(process.env.PORT, process.env.IP);
module.exports = app;