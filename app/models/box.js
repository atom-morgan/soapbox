var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var BoxSchema = new Schema({
  creator: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  question_count: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Box', BoxSchema);
