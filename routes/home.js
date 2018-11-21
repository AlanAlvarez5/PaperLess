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

router.get('/explore', function(req, res){
  res.render('explore', {title:'Explorar'});
});

module.exports = router;
