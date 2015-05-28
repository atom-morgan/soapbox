module.exports = function(app, express) {

  var boxRouter = express.Router();

  /* Creates a new box */
  boxRouter.route('/box')
    .post(function(req, res) {
      var box = new Box();

      box.creator = req.body.creator;
      box.title = req.body.title;
      box.description = req.body.description;

      box.save(function(err, box) {
        if (err) { res.send(err); }
        res.json({ box: box, message: 'New Box created!' });
      });
    });

  boxRouter.route('/box/:box_id')
    /* Deletes an instance of a box */
    .delete(function(req, res) {
      Box.remove({
        _id: req.params.box_id
      }, function(err, box) {
        if (err) { res.send(err); }
        res.json({ message: 'Box deleted!' });
      });
    })

    /* Gets an instance of a box */
    .get(function(req, res) {
      Box.findById(req.params.box_id, function(err, box) {
        if (err) { res.send(err); }
        res.json(box);
      });
    })

    /* Edits a box */ 
    .put(function(req, res) {
      Box.findById(req.params.box_id, function(err, box) {
        if (err) { res.send(err); }

        if (req.body.title) { box.title = req.body.title; }
        if (req.body.description) { box.description = req.body.description; }

        box.save(function(err) {
          if (err) { res.send(err); }
          res.json({ message: 'Box updated!' });
        });
      });
    });

  return boxRouter; 
}
