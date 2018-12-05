var express = require('express');
var http = require('http');
var formidable = require('formidable');
var router = express.Router();
var fs = require('fs');


router.get('/upload', function(req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="/upload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
});

router.post('/upload', function (req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = '/Users/diego/GoogleDrive/Developer/Software_Development/PaperLess/files/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
});

router.get('/fileuploaded', function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('file sended');
    return res.end();

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/adduser', function (req, res){
    res.render('adduser', {title: 'Crear Nuevo Usuario'});
});

router.get('/edituser', function(req, res) {
    res.render('edituser', {title:'Editar información'});
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

router.get('/caldoc', function(req, res) {
    var db = req.db;
    //var db2 = req.db;
    var collection1 = db.get('calls');
    var collection2 = db.get('users');
    
    collection1.find({},{},function(e,docs){
        res.render('caldoc', {
            "calls" : docs
        });
    });
    /*
    collection2.find({},{},function(e,docs){
        res.render('caldoc', {
            "users" : docs
        });
    });
    */

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

router.get('/uploaddoc', function(req, res) {
    res.render('uploaddoc', {title:'Sube tus archivos'});
/*
    var db = req.db;
    var collection = db.get('calls');
    collection.find({},{},function(e,docs){
        res.render('explore', {
            "calls" : docs
        });
    });
*/
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

// Con acción de boton +, añade nuevos textbox
router.post('/reqdocadd', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var space = " ";

  // Set our collection
  var collection = db.get('reqdocspace');

  // Submit to the DB
  collection.insert({
      "space" : space,
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("reqdoc");
      }
  });
});

// Con acción de boton +, añade nuevos textbox
router.post('/reqdocdelete', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
  
    // Get our form values. These rely on the "name" attributes
    var trued = " ";
  
    // Set our collection
    var collection = db.get('reqdocspace');
  
    // Submit to the DB
    collection.remove(
        { "space": " " }, { justOne: true}/*, function (err, doc) {
        
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("reqdoc");
        } 
    }
    */
    );
    res.redirect("reqdoc");

});

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

router.post('/edituser', function (req, res){
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
