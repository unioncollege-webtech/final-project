var express = require('express');
var app = express();

app.get('/', function (req, res){
    res.send('Hello, World');
});
app.use('final-project', express.static('final-project'));

app.listen(process.env.PORT, process.env.IP);