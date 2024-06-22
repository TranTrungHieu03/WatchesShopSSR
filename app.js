var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("passport");
const passportConfig = require('./config/passport');

const session = require('express-session');
const flash = require('connect-flash');
var indexRouter = require('./routes/index');
const connectDB = require('./config/database');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect DB
connectDB();

app.use(session({
  secret: "watchesPRJ",
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 20, secure: false, httpOnly: true }
}))

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport)


app.use(flash());
app.use((req, res, next) => {
  // res.locals.message = req.flash("message")
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  res.locals.message = req.session.message
  delete req.session.message
  res.locals.info = req.session.info
  delete req.session.info
  res.locals.user = req.user;
  next()
})

app.use(indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
