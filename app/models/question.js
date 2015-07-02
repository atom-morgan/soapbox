var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  _box_id: { type: String, required: true, index: true },
  _box_title: { type: String, required: true },
  creator: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
  answer: { type: String },
  voters: [{ type: Schema.Types.ObjectId, ref: 'Voter' }]
});

module.exports = mongoose.model('Question', QuestionSchema);
