var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var users = require('./routes/users');
var connect = require('./routes/connect');
var disconnect = require('./routes/disconnect');
var profilEdit = require('./routes/profilEdit');
var upload = require('./routes/upload');
var apropos = require('./routes/apropos');
var activities = require('./routes/activities');
var connexion_error = require('./routes/connexion_error');
var update_error = require('./routes/update_error');
var not_unique_email = require('./routes/not_unique_email');
var password_too_short = require('./routes/password_too_short');
var email_invalid = require('./routes/email_invalid');
var myaccount = require('./routes/myaccount');
var error = require('./routes/error');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users',users);
app.use('/connect',connect);
app.use('/disconnect',disconnect);
app.use('/profilEdit',profilEdit);
app.use('/upload',upload);
app.use('/apropos',apropos);
app.use('/activities',activities);
app.use('/connexion_error',connexion_error);
app.use('/update_error',update_error);
app.use('/not_unique_email',not_unique_email);
app.use('/password_too_short',password_too_short);
app.use('/email_invalid',email_invalid);
app.use('/myaccount',myaccount);
app.use('/error',error);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);  
  res.render('error');
});

module.exports = app;
