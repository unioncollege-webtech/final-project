var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var photo = require('./photos.json');

//create new express app
var app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));


var storage = multer.diskStorage({
    // Store uploaded images in the public directory
    destination: 'public/uploads/images',
    filename: function(req, file, cb) {
        // Use the original name for the filename
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});


app.locals.sitename = "Photo Gallery";
app.locals.photo = photo;

app.get('/', function(req, res) {
    res.render('form', {
        title: "Image Gallery",
        images: photo
    });
});

app.post('/', upload.single('upl'), function(req, res) {
    if (req.file) {
        photo.push({

            filename: req.file.filename,
            caption: req.body.Catagory || ''
        });
        galleryPhotos(photo);
        res.redirect('/');
    }

});


app.post('/images', function(req, res) {
    fs.unlink('public/uploads/images/' + req.body.file, function(err) {
        if (err) throw err;
        var deletePhoto;
        for(i in photo){
            if (photo[i].filename == req.body.file){
                deletePhoto = i;
            }
                
        }
        photo.splice(deletePhoto,1);
        var i = photo.indexOf(req.body.file);
        //photo.splice(i,0);


            galleryPhotos(photo);
        res.redirect('/');
    });
    //photo.removeItem({
    //  filename: req.file.filename,
    //caption: req.body.caption || ''
    //});
    //}

});
//app.delete('/api/photos/:id', photo.deletePhoto);

exports.deletePhoto = function(req, res) {
    photo.remove({
        _id: req.params.id
    }, function(err, photo) {
        if (err) {
            return res.send({
                status: "200",
                response: "fail"
            });
        }
        fs.unlink(photo.path, function() {
            res.send({
                status: "200",
                responseType: "string",
                response: "success"
            });
        });
    });
};

function galleryPhotos(photo) {
    fs.writeFile(__dirname + '/photos.json', JSON.stringify(photo), 'utf-8');
}


// Start the server
var port = process.env.PORT || 3000;
var address = process.env.IP || '127.0.0.1'
app.listen(port, address, function() {
    console.log('%s listening at http://%s:%s',
        app.locals.sitename, address, port);
});



/* var titleSubmitted = req.body && req.body.titleSubmitted && req.body.titleSubmitted.trim();

 if (titleSubmitted) {
     
     // TODO: Don't add duplicate titles
     imgGallery.push(
         req.body.titleSubmitted.trim()
     );
     fs.writeFile("images.js", JSON.stringify(imgGallery,'utf8'));
     console.log(imgGallery);
     
 }*/
