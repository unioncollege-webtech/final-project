exports.list = function(req, res) {
    req.getConnection(function(err, connection) {
        var query = connection.query('SELECT * FROM articles', function (err, rows) {
            if (err) {
                console.log('Error: %s', err);
            }
            
            res.render('articles', {headline: 'Articles', data: rows});
        });
    }) ;
};

exports.add = function(req, res) {
    res.render('add_article', {headline: 'Add an article'});  
};

exports.save = function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function(err, connection) {
       var data = {
           author: input.author,
           title: input.title,
           body: input.body
       };
       
       var sql = connection.query('INSERT INTO articles set ? ', data, function(err, rows) {
          if (err) {
              console.log('Error: %s', err);
          }
          res.redirect('/articles');
       });
    });
};

exports.edit = function(req, res) {
    var id = req.params.id;
    
    req.getConnection(function(err, connection) {
        var sql = connection.query('SELECT * FROM articles WHERE id = ?', [id], function(err, rows) {
          if (err) {
              console.log('Error: %s', err);
          }
          res.render('edit_article', {headline:"Edit Article", data:rows});
       });
    });
};

exports.save_edit = function(req, res) {
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function(err, connection) {
        var data = {
            author: input.author,
            title: input.title,
            body: input.body
        }
        
        connection.query('UPDATE articles SET ? WHERE id = ?', [data, id], function(err, rows) {
           if (err) {
               console.log('Error: %s', err);
           }
           res.redirect('/articles');
        });
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;
    
    req.getConnection(function(err, connection) {
        
        connection.query('DELETE FROM articles WHERE id = ?', [id], function(err, rows) {
           if (err) {
               console.log('Error: %s', err);
           }
           res.redirect('/articles');
        });
    });
};