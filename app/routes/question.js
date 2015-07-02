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
        res.json({ question: newQuestion, message: 'New question created!' });
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

    /* Add a vote to a question */
    .put(function(req, res) {
      var vote = new Voter();

      vote.voter = req.body.voter;
      vote.upvote = req.body.upvote;
      vote.downvote = req.body.downvote;

      vote.save(function(err, vote) {
        if (err) { res.send(err); }
        Question.findById(req.params.question_id, function(err, question) {
          vote.upvote === true ? question.votes++ : question.votes--;
          question.voters.push(vote);
          question.save(function(err, updatedQuestion) {
            if (err) { res.send(err); }
            res.json({ message: 'Vote added!' });
          });
        });
      });
    });

  return questionRouter;
}
