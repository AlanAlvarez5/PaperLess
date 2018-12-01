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

router.get('/reqdoc', function(req, res) {
    var db = req.db;
    var collection = db.get('reqdocspace');
    collection.find({},{},function(e,docs){
        res.render('reqdoc', {
            "reqdocspace" : docs
        });
    });
  });

router.get('/login', function(req, res){
  res.render('login', {title:'Login'});
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


router.post('/login', function (req, res){
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    
    var lgemail = req.body.email;
    var lgpassword = req.body.password;

    // Set our collection
    var collection = db.get('users');

    res.redirect("/explore");
    //console.log('Alerta');
    // Find the user
    /*
    var listed = collection.findOne({
          email: lgemail },
        { password: lgpassword 
        }, function(err, doc){
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.redirect("addcall");
            }
        }
    );
    */
/*
    if (listed) {
        res.body.alert("Alerta");   
    }
    */
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

/*
// Con acción de boton +, añade nuevos textboxs
router.post('/reqdoc', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var space = " ";

  // Set our collection
  var collection = db.get('reqdocspace');

  // Submit to the DB
  collection.insert({
      "name" : name,
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("addcall");
      }
  });
});

*/

router.post('/adduser', function (req, res){
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var name = req.body.name;
    var last_name = req.body.lastname;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var institution = req.body.institution;
    var is_admin = req.body.rol;
    // Set our collection
    var collection = db.get('users');

    // Submit to the DB
    collection.insert({
        "name" : name,
        "last_name" : last_name,
        "username" : username,
        "email" : email,
        "password" : password,
        "institution" : institution,
        "is_admin" : is_admin
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
