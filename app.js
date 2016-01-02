var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
app.set('port', 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port: ' + app.get('port'));
});

app.use(function(req, res, next){
  if(req.url == '/'){
    res.end("Hello");
  }else{
    next();
  }
});

app.use(function(req, res, next){
  if(req.url == '/test'){
    res.end("Test");
  }else{
    next();
  }
});

app.use(function(req, res, next){
  if(req.url == '/forbidden'){
    next(new Error('wops, denied!'));
  }else{
    next();
  }
});


app.use(function(req, res){
  res.send(404, "Page not found, sorry.");
});

app.use(function(err, req, res, next){
  if(app.get('env') == 'development'){
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  }else{
    res.send(500);
  }
});


/*
*
*
*
 var express = require('express')
 , routes = require('./routes');

 var app = module.exports = express.createServer();

 // Configuration

 app.configure(function(){
 app.set('views', __dirname + '/views');
 app.set('view engine', 'jade');
 app.use(express.bodyParser());
 app.use(express.methodOverride());
 app.use(express.cookieParser());
 app.use(express.session({ secret: 'your secret here' }));
 app.use(app.router);
 app.use(express.static(__dirname + '/public'));
 });

 app.configure('development', function(){
 app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
 });

 app.configure('production', function(){
 app.use(express.errorHandler());
 });

 // Routes

 app.get('/', routes.index);

 app.listen(3000, function(){
 console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
 });
*
*
* */