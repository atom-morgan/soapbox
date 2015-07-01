module.exports = function(app, express) {

  var userRouter = express.Router();

  /* Get all users */
  userRouter.route('/users')
    .get(function(req, res) {
      User.find({}, function(err, users) {
        if (err) { res.send(err); }
        res.json(users);
      });
    });
 
  /* Get one user's information by username */ 
  userRouter.route('/u/:username')
    .get(function(req, res) {
      User.findOne({ 'username': req.params.username }, function(err, user) {
        if (err) { res.send(err); }
        res.json(user); 
      }); 
    });

  /* Get all boxes created by a specific user */
  userRouter.route('/users/:username/box')
    .get(function(req, res) {
      Box.find({ creator: req.params.username }, function(err, boxes) {
        if (err) { res.send(err); }
        res.json(boxes);
      });
    });

  userRouter.route('/users/:username/stats/boxes')
    .get(function(req, res) {
      Box.count({ creator: req.params.username }, function(err, boxCount) {
        if (err) { res.send(err); }
        res.json(boxCount);
      });
    });

  userRouter.route('/users/:username/stats/questions')
    .get(function(req, res) {
      Question.count({ creator: req.params.username }, function(err, questionCount) {
        if (err) { res.send(err); }
        res.json(questionCount);
      });
    });

  userRouter.route('/users/:username/stats/upvotes')
    .get(function(req, res) {
      Voter.count({ voter: req.params.username, upvote: true }, function(err, upvoteCount) {
        if (err) { res.send(err); }
        res.json(upvoteCount);
      });
    });

  /* ADMIN ROUTES TO EDIT AND DELETE USERS */
  userRouter.route('/users/:user_id')
    .get(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) { res.send(err); }
        res.json(user); 
      }); 
    })

    .put(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) { res.send(err); }

        if (req.body.name) { user.name = req.body.name; }
        if (req.body.username) { user.username = req.body.username; }
        if (req.body.password) { user.password = req.body.password; }

        user.save(function(err) {
          if (err) { res.send(err); }
          res.json({ message: 'User updated!' });
        });
      });
    })

    .delete(function(req, res) {
      User.remove({
        _id: req.params.user_id
      }, function(err, user) {
        if (err) { res.send(err); }
        res.json({ message: 'Successfully deleted!' });
      });
    });

  return userRouter;
}
