exports.index = function(req, res) {
    res.render('index', {headline: 'Simple Blog'});
}