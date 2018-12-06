var express = require('express');
var http = require('http');
var formidable = require('formidable');
var router = express.Router();
var fs = require('fs');
var validator = require('validator');
var url = require('url');

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://SYSTEM:123@cluster0-shard-00-00-qmkm8.mongodb.net:27017,cluster0-shard-00-01-qmkm8.mongodb.net:27017,cluster0-shard-00-02-qmkm8.mongodb.net:27017/PaperLessDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
//MongoClient.connect(uri);


router.get('/upload', function(req, res, next) {
  res.render('uploaddoc', { title: 'Uploaddoc' });
    /*
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="/upload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
        */
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

router.post('/addcall', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
  
    // Get our form values. These rely on the "name" attributes
    var coltitle = req.body.title;
    var institution = req.body.institution;
    var limitdate = req.body.limited_date;
    var description = req.body.description;
    var num_doc = req.body.numElements;
  
    // Set our collection
    var collection = db.get('calls');
  
    var docName = doc+num_doc;
    var docArray = new Array;

    for (i=0; i<num_doc;i++){
        docArray.push(docName);
    }

    // Submit to the DB
    collection.insert({
        "title" : coltitle,
        "institution" : institution,
        "limited_date" : limitdate,
        "description" : description,
        "documents": docArray
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
// Required Documentation
router.get('/reqdoc', function(req, res) {
    var db = req.db;
    var collection = db.get('reqdocspace');
    collection.find({},{},function(e,docs){
        res.render('reqdoc', {
            "reqdocspace" : docs
        });
    });
});
*/
// Calificar documentación
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

router.get('/description:id', function(req, res) {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    var url1 = req.protocol;
    var url2 = req.get('host');
    var url3 = req.originalUrl;
    //var lid = req.query;
    //res.write(url1);
    //res.write(url1);
    //var url_parts = url.parse(request.url, true);
    //var query = url_parts.query;
    //res.write(ulr2);
    var query = url3.substring(12);
    var db = req.db;
    var collection = db.get('calls');
    collection.find({_id: query},{},function(e,docs){
        res.render('description', {
            "calls" : docs
    });
  });
});

router.get('/uploaddoc', function(req, res) {
    res.render('uploaddoc', {title:'Sube tus archivos'});

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

});


router.get('/description/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('calls');
    collection.find({},{},function(e,docs){
        res.render('description', {
            "calls" : docs
        });
    });
  });






// Con acción de boton +, añade nuevos textbox
router.post('/addcallcadd', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var count = 0;
  var plus = 1;

  // Set our collection
  var collection = db.get('calls');

  count = db.num_doc + 1;

  /*
  // Submit to the DB
  collection.insert({
      "num_doc" : count,
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
  */

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
    var repeatpassword = req.body.repeatpassword;
    var institution = req.body.institution;
    var is_admin = req.body.rol;
    // Set our collection
    var collection = db.get('users');

    if (repeatpassword != password){
        res.send("La contraseña no es igual");
    }
    if (validator.isEmail(email)==false){
        // Si hay error
       // document.getElementById("inputemail").style.borderColor = "red";
    }else{
        // Si está todo bien
        //document.getElementById("inputemail").style.borderColor = "green";
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
        }else {
            // And forward to success page
            res.redirect("explore");
        }
        });
    }
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
