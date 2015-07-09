module.exports = function(app, express) {

  var questionRouter = express.Router();

  /* Create a question on a box instance */
  questionRouter.route('/question')
    .post(function(req, res) {
      var question = new Question();

      question._box_id = req.body.box_id;
      question._box_title = req.body.box_title;
      question.creator = req.body.creator;
      question.content = req.body.content;

      question.save(function(err, newQuestion) {
        if (err) { res.send(err); }
        Box.findOne({ _id: req.body.box_id }, function(err, box) {
          box.question_count += 1;
          box.save(function(err, newBox) {
            if (err) { res.send(err); }
            res.json({ question: newQuestion, message: 'New question created!' });
          });
        });
      });

    });

  questionRouter.route('/questions/u/:username')
    .get(function(req, res) {
      Question.find({ creator: req.params.username }, function(err, questions) {
        if (err) { res.send(err); }
        res.json(questions);
      });
    });

  /* Get all questions for a box instance */
  questionRouter.route('/questions/:box_id')
    .get(function(req, res) {
      Question.find({ _box_id: req.params.box_id })
        .populate('voters')
        .exec(function(err, questions) {
          if (err) { res.send(err); }
          res.json(questions);
        });
    });

  questionRouter.route('/question/:question_id')
    /* Get one question's data by id */
    .get(function(req, res) {
      Question.findOne({ _id: req.params.question_id })
        .populate('voters')
        .exec(function(err, question) {
          if (err) { res.send(err); }
          res.json({ question: question, message: 'Question found!' });
        });
    })

    .delete(function(req, res) {
      Question.remove({ _id: req.params.question_id }, function(err, question) {
        if (err) { res.send(err); }
        Box.findById(req.body._box_id, function(err, box) {
          if (err) { res.send(err); }

          box.question_count--;
          box.save(function(err, updatedBox) {
            if (err) { res.send(err); }
            res.json({ message: 'Question deleted!' });
          });
        });
      });
    })

    .put(function(req, res) {
      var content = req.body.content;

      Question.findById(req.params.question_id, function(err, question) {
        if (err) { res.send(err); }
        question.content = content;
        question.save(function(err, updatedQuestion) {
          if (err) { res.send(err); }
          res.json({ message: 'Question updated!' });
        });
      });
    });

  return questionRouter;
}
