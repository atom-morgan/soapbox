var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  _box_id: { type: String, required: true, index: true },
  creator: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
  answer: { type: String }
});

module.exports = mongoose.model('Question', QuestionSchema);
