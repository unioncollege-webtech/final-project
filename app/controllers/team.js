var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Team = mongoose.model('Team'),
    Player = mongoose.model('Player');

module.exports = function(app) {
    app.use('/team', router);
};

router.route('/')
    .get(function(req, res, next) {
        Team.find({ section: 'Coed'})
            .sort({ teamName: '1'})
            .exec()
            .then(function(coed) {
                    return Team.find({ section: 'Guys' })
                    .sort({ teamName: '1' })
                    .exec()
                    .then(function(guys) {
                        return [coed, guys]
                    })
            })
            .then(function(teams) {
                return Team.find({ section: 'Girls' })
                .sort({ teamName: '1' })
                .exec()
                .then(function(girls) {
                    return [teams[0], teams[1], girls]
                })
            })
            .then(function(teams) {
                res.render('team/index', {
                    title: 'Teams',
                    coed: teams[0],
                    guys: teams[1],
                    girls: teams[2]
                })
            })
            .catch(function(err) {
                next(err)
            })
    })
    
router.route("/addTeam")
    .get(function(req, res, next) {
        res.render('team/add_team', {
            title: 'New Team'
        })
    })
    .post(function(req, res, next) {
        return new Team({
            teamName: req.body.teamName,
            wins: 0,
            losses: 0,
            members: [],
            section: req.body.section
        }).save()
        .then(function(updated){
            res.redirect('/team')
        })
        .catch(function(err) {
                next(err);
            });
    })
    
router.route("/editTeam")
    .get(function(req, res, next) {
        Team.findOne({
                _id: req.query._id
            }).populate('members').exec()
            .then(function(team) {
                res.render('team/edit_team', {
                    title: 'Edit Team',
                    team: team,
                    players: team.members
                })
            })
            .catch(function(err){
                next(err);
            })
    })
    .post(function(req, res, next) {
        Team.findOne({
                _id: req.body.teamId
            }).populate('members').exec()
            .then(function(team) {
                
                
                var delmembers = req.body['members']
                console.log(team.members)
                if (delmembers != null) {
                    if (delmembers.constructor === Array) {
                        delmembers.map(function(memberId) {
                            team.members.pull(memberId)
                            })
                    }
                    else {
                        team.members.id(delmembers).remove()
                    }
                }
                team.teamName = req.body.teamName;
                return team.save()
                //TODO add sessions
                    .then(function() {
                        res.writeHead(302, {
                            'Location': '/team/editteam?_id=' + req.body.teamId,
                            _id: req.body.teamId
                        })
                        res.end()
                    })
            })
            .catch(function(err) {
                next(err);
            })
    })

router.route('/addPlayer')
    .get(function(req, res, next) {
        Team.findOne({
                _id: req.query._id
            }).populate('members').exec()
            .then(function(team) {
                return Player.find({
                        _id: {
                            $nin: team.members
                        }
                    }).exec()
                    .then(function(players) {
                        res.render('team/add_player', {
                            title: 'Edit Team',
                            team: team,
                            players: players
                        })
                    })
            })
            .catch(function(err) {
                next(err);
            })
    })
    .post(function(req, res, next) {

        Team.findOne({
                _id: req.body.teamId
            }).exec()
            .then(function(team) {

                req.body['players'].map(function(id) {
                    team.members.push(id)
                })

                return team.save()
            })
            
            //TODO: add sessions
            .then(function() {
                res.writeHead(302, {
                    'Location': '/team/editteam?_id=' + req.body.teamId,
                    _id: req.body.teamId
                })
                res.end()
            })
            .catch(function(err) {
                next(err);
            })
    })