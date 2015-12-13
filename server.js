var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(bodyparser.urlencoded({
    extended: false
}));

app.locals.site = {
  name: 'Contact List',
  source: 'https://github.com/mrdcs92/final-project',
  author: {
    firstname: "Dylan",
    lastname: "Smith"
  }
};


var contactList = [];


app.get('/', function(req, res) {
  res.render('index', {
    contacts: contactList
  });
});


app.get('/delete', function(req, res) {
  // Unsure how to delete specific item
  contactList.splice(req.body.id, 1);
  res.redirect('/');
});


app.post('/', function(req, res) {
  var firstSubmitted = req.body && req.body.Fname && req.body.Fname.trim();
  var lastSubmitted = req.body && req.body.Lname &&  req.body.Lname.trim();
  var emailSubmitted = req.body && req.body.emailAddress && req.body.emailAddress.trim();
  var phoneSubmitted = req.body && req.body.phone && req.body.phone.trim();
  
  if(firstSubmitted && lastSubmitted && emailSubmitted && phoneSubmitted) {
      
      var unique = false;
      for (var prop in contactList) {
          if (contactList[prop].email === emailSubmitted || contactList[prop].phoneNumber === phoneSubmitted) unique = true;
      }
      
      if (!unique)
        contactList.push({
          firstname: req.body.Fname,
          lastname: req.body.Lname,
          phoneNumber: req.body.phone,
          email: req.body.emailAddress,
        });
  }
  
    res.render('index', {
    contacts: contactList
  });
  
});

// Start the server
var port = process.env.PORT || 3000;
var address = process.env.IP || '127.0.0.1';
app.listen(port, address, function() {
  console.log('%s listening at http://%s:%s',
    app.locals.site.name, address, port);
});

