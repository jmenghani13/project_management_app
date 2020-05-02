const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require ('passport');
const config = require('./config/database');


mongoose.connect(config.database,{ useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
let db = mongoose.connection;

db.once('open',function(){
  console.log("Connected to MongoDb");
});

db.on('error',function(){
  console.log(err.message);
});


const app = express();

//Load View Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(require('connect-flash')());

app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Passport Config
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());


app.get('*',function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

app.get('/',function(req,res){
  res.render('login');
});


/*app.post('/', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/project',
    failureRedirect:'/',
    failureFlash: true
  })(req, res,next);
});*/

app.post('/', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/project',
    failureRedirect:'/',
    failureFlash: true
  })(req, res,next);
});

app.get('/logout',function(req, res){
  req.logout();
  req.flash('success','You are logged out');
  res.redirect('/');
});



let project = require('./routes/project');
let user = require ('./routes/user');
//let workspace = require ('./routes/workspace');
app.use('/project',project);
app.use('/user',user);
//app.use('/workspace',workspace);
//


app.listen(4000,function(){
  console.log('Server started on port 4000.')
});
