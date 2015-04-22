var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VoterSchema = new Schema({
  voter: { type: String, required: true },
  upvote: { type: Boolean, required: true },
  downvote: { type: Boolean, required: true }
});

module.exports = mongoose.model('Voter', VoterSchema);
