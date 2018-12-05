var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongo = require('mongodb');
var monk = require('monk');

var MongoClient = require('mongodb').MongoClient;

var ruri = "mongodb://SYSTEM:123@cluster0-shard-00-00-qmkm8.mongodb.net:27017,cluster0-shard-00-01-qmkm8.mongodb.net:27017,cluster0-shard-00-02-qmkm8.mongodb.net:27017/PaperLessDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect(ruri, function(err, client) {
  var rdb = client.db("PaperLessDB");
  
  console.log("db object points to the database : "+ rdb.databaseName);
  const collection = client.db("PaperLessDB").collection("calls");
  collection.insertOne({name: "Robert", phone: "7-07-00-00"});
  client.close();
});

var db = monk('localhost:27017/paperLessDB');
//var db = monk('mongodb+srv://SYSTEM:123@cluster0-qmkm8.mongodb.net:27017/PaperLessDB?retryWrites=true');

var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
//var uploadRouter = require('./routes/upload');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){
  req.db = db;
  next();
});


app.use('/', homeRouter);
app.use('/users', usersRouter);
//app.use('/upload', uploadRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // added this
  app.locals.basedir = path.join(__dirname, 'views');

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
