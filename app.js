var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var articles = require('./routes/articles'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(
    connection(mysql,{
        host: '0.0.0.0',
        user: 'halfwayawake',
        password : '',
        port : 3306,
        database:'c9'
    },'pool')
);

app.get('/', routes.index);
app.get('/articles', articles.list);
app.get('/articles/add', articles.add);
app.post('/articles/add', articles.save);
app.get('/articles/delete/:id', articles.delete);
app.get('/articles/edit/:id', articles.edit);
app.post('/articles/edit/:id', articles.save_edit);
app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});