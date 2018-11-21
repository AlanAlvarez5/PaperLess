var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Convocatorias' });
});

router.get('/adduser', function (req, res){
    res.render('adduser', {title: 'Crear Nuevo Usuario'});
});

module.exports = router;
