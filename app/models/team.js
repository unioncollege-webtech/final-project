var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
  teamName: String,
  wins: Number,
  losses: Number,
  section: String,
  members:[{type: mongoose.Schema.ObjectId, ref: 'Player'}]
});


mongoose.model('Team', teamSchema);
