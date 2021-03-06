var bodyParser = require('body-parser'); 
    User = require('../models/user'),
    Box = require('../models/box'),
    Voter = require('../models/voter'),
    Question = require('../models/question'),
    jwt = require('jsonwebtoken'),
    config = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

  //API ROUTES
  var apiRouter = express.Router();

  //Authentication routes
  apiRouter.post('/authenticate', function(req, res) {
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user) {
      if (err) { throw err; }

      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User was not found.'
        });
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {
          var token = jwt.sign({
            name: user.name,
            username: user.username
          }, superSecret, {
            expiresInMinutes: 1440 //expires in 24 hours
          });

          res.json({
            success: true,
            message: 'Enjoy your token',
            token: token
          });
        }
      }
    });
  });

  apiRouter.route('/users')
    .post(function(req, res) {
      var user = new User();

      user.name = req.body.name;
      user.username = req.body.username;
      user.password = req.body.password;

      user.save(function(err) {
        if (err) {
          if (err.code == 11000) {
            return res.json({ success: false, message: 'A user with that username already exists '});
          } else {
            return res.send(err);
          }
        }
        res.json({ message: 'User created!' });
      });
    });

  //middleware to verify a token
  apiRouter.use(function(req, res, next) {
    //check header or url params or post params for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    //var token = req.body.token || req.params.token || req.headers['x-access-token'];

    if (token) {
      //verifies secret and checks expiration
      jwt.verify(token, superSecret, function(err, decoded) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'  });
        } else {
          //save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      //no token - 403 (access forbidden)
      return res.status(403).send({
        success: false,
        message: 'No token provided.' 
      });
    }
  });

  //endpoint to get a user's information
  apiRouter.get('/me', function(req, res) {
    res.send(req.decoded);
  });

  //test route
  apiRouter.get('/', function(req, res) {
    res.json({ message: 'Welcome to our API!' });
  });

  return apiRouter;

};
