var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/adduser', function (req, res){
    res.render('adduser', {title: 'Crear Nuevo Usuario'});
});

router.get('/addcall', function(req, res){
  res.render('addcall', {title:'Crea una nueva convocatoria'});
});


router.get('/explore', function(req, res) {
  var db = req.db;
  var collection = db.get('calls');
  collection.find({},{},function(e,docs){
      res.render('explore', {
          "calls" : docs 
      });
  });
});

router.post('/addcall', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var coltitle = req.body.title;
  var institution = req.body.institution;
  var limitdate = req.body.limited_date;
  var description = req.body.description;

  // Set our collection
  var collection = db.get('calls');

  // Submit to the DB
  collection.insert({
      "title" : coltitle,
      "institution" : institution,
      "limited_date" : limitdate,
      "description" : description
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("explore");
      }
  });
});

module.exports = router;
