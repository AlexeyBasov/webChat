var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var app = express();
app.set('port', config.get('port'));

app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.use(express.favicon());
if(app.get('env') == 'development'){
  app.use(express.logger('dev'));
}else{
  app.use(express.logger('default'));
}
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(app.router);

app.get('/', function (req, res, next){
  res.render('index', {
    body: "<h2>Hello</h2>"
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next){
  if(app.get('env') == 'development'){
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  }else{
    res.send(500);
  }
});

http.createServer(app).listen(config.get('port'), function(){
  log.info("Express started on port: " + config.get('port'));
});