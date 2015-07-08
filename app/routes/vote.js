module.exports = function(app, express) {
  var voteRouter = express.Router();

  voteRouter.route('/vote/:question_id')
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

  return voteRouter;
}
