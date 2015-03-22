var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var BoxSchema = new Schema({
  creator: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: false },
  questions: { type: Array },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Box', BoxSchema);
