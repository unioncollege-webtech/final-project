var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    Team = mongoose.model('Team');

module.exports = function(app) {
    app.use('/game', router);
};

router.route('/')
    .get(function(req, res, next) {
        Game.find({
                section: 'Coed'
            })
            .populate('winner')
            .populate('loser')
            .exec()
            .then(function(coed) {
                return Game.find({section: 'Guys'})
                .populate('winner')
                .populate('loser')
                .exec()
                .then(function(guys){
                    return [coed, guys];
                })
            })
            .then(function(games){
                return Game.find({section: 'Girls'})
                .populate('winner')
                .populate('loser')
                .exec()
                .then(function(girls){
                    return [games[0], games[1], girls];
                })
            })
            .then(function(games){
                res.render('game/index', {
                    title: 'Games',
                    coed: games[0],
                    guys: games[1],
                    girls: games[2]
                })
            })
            .catch(function(err) {
                next(err);
            });
    })
    .post(function(req, res, next) {
        Game.findOne({
            _id: req.body.gameId
        }).exec()
        .then(function(game) {
            Team.findOne({
                _id: req.body.winnerId
            })
            .then(function(doc) {
                doc.wins--
                doc.save()
            })

            Team.findOne({
                _id: req.body.loserId
            })
            .then( function(doc) {
                doc.losses--
                    doc.save()
            })
            
            Game.remove({
                _id: req.body.gameId
            })
            .then(function(){
                res.redirect('/game')
            })
            .catch(function(err){next(err)})
        })
        .catch(function(err){
            next(err)
        })
    })
    
router.route('/addGame')
    .get(function(req, res, next) {
        var date = new Date()
        Game.find()
        .populate('winner')
        .populate('loser')
        .exec()
        .then(function(games) {
            return Team.find({
                section: req.query.section
            }).exec()
            .then(function(teams){
                return [games, teams];
            })
        })
        .then(function(results) {
                var numGames;
                if (results[0] === undefined) numGames = 1
                else numGames = results[0].length + 1
                res.render('game/add_game', {
                    title: 'Add Game',
                    numGames: numGames,
                    teams: results[1],
                    section: req.query.section,
                    date: date
                })
            })
        .catch(function(err){
            next(err);
        })
    })
    .post(function(req, res, next) {
        Team.find({
                _id: {
                    $in: [req.body.winner, req.body.loser]
                }
            })
            .exec()
            .then(function(teams) {
                for (var i in teams) {
                    console.log(teams[i])
                    if (teams[i]._id == req.body.winner) {
                        Team.findOne({
                            _id: req.body.winner
                        }).exec()
                        .then(function(doc) {
                            console.log("alsfj;sklfj")
                            doc.wins++
                                doc.save()
                        })
                    }
                    else {
                        Team.findOne({
                            _id: req.body.loser
                        }, function(err, doc) {
                            if (err) throw err
                            doc.losses++
                                doc.save()
                        })
                    }
                }
                
                new Game({
                        gameName: req.body.gameName,
                        winner: req.body.winner,
                        winnerPoints: req.body.winnerPoints,
                        loser: req.body.loser,
                        loserPoints: req.body.loserPoints,
                        section: req.body.section,
                        date: new Date(req.body.date + ' ' + req.body.time)
                    }).save()
                    .then(function() {
                        res.redirect('/game');
                    })
                    .catch(function(err) {
                        next(err)
                    })
            })
            .catch(function(err) {
                next(err)
            })
    })