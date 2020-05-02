  const express = require('express');
const path = require('path');
var fs = require('fs');
var os = require('os');
const router =express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const moment = require('moment');


let User = require('../models/user');
let Project = require('../models/project');
let Task = require('../models/task');
let Token = require('../models/token');
let Workspace = require('../models/workspace');

//GET User's tasks
router.get('/my_task',function(req,res){

  let query= {creator: req.user._id};
  Project.findOne({$or:[{creator:req.user._id},{team_member:{$in:[req.user.id]}}]}).exec(function(err,project){
  User.find({}).exec(function(err,users){
  Task.find(query,function(err,tasks){
  Project.find({}).populate('creator','name').exec(function(err,projects){
    res.render('my_task',{
      projects: projects,
      users: users,
      tasks: tasks,
      project: project
    });
  });
  });
  });
  });
});

//GET Individual Task Report
router.get('/task_detail/:id',function(req,res){
  User.find({}).exec(function(err,users){
  Task.findById(req.params.id).populate('project','name').exec(function(err,task){
  Project.find({}).populate('creator','name').exec(function(err,projects){
    res.render('task_details_full',{
      projects: projects,
      users: users,
      task: task
  });
  });
  });
  });
});

//GET Task Information
router.get('/my_task/task/:id',function(req,res){

  Task.findById(req.params.id).populate('project','name').exec(function(err,task){
  Project.find({$or:[{creator:req.user._id},{team_member:{$in:[req.user.name]}}]}).exec(function(err,projects){
  Task.find({}).exec(function(err,tasks){
  User.find({}).exec(function(err,users){
  Project.findOne({$or:[{creator:req.user._id},{team_member:{$in:[req.user.name]}}]}).exec(function(err,project){
    console.log(project);
    res.render('task_details',{
      project: project,
      projects: projects,
      users: users,
      task: task,
      tasks: tasks,
    });
    });
    });
    });
    });
    });

});

//PUT Task Information
router.put('/my_task/task/:id',function(req,res){
  Task.findById(req.params.id,function(err,task){
  Project.findOne({name:req.body.project},function(err,project){
  User.findById(req.user._id,function(err,user){

    const id = req.user._id;

    if(req.body.status)
    {
      if(req.body.status=="checkMark Compelete")
        {
          task.status="Compelete";
          const object = {
            user_id: id,
            text: user.name+" marked this task as Compelete.",
            date: Date.now()
          }
          task.activity_log.push(object);
        }
      else
        {
          task.status="Incomplete";
          const object = {
            user_id: id,
            text: user.name+" marked this task as Incompelete.",
            date: Date.now()
          }
          task.activity_log.push(object);
        }
    }
    else {

    if(req.body.assigned_to != "")
    {
      if(task.assigned_to!==req.body.assigned_to)
      {
        task.assigned_to=req.body.assigned_to;
        const object = {
        user_id: id,
        text: user.name+" assigned this task to " + task.assigned_to +".",
        date: Date.now()
        }
        task.activity_log.push(object);
      }
    }

    if(req.body.description != "")
    {
        task.description=req.body.description;
    }
    if(req.body.due_date != "")
    {
        if (task.due_date!==req.body.due_date)
        {
          task.due_date=req.body.due_date;
          const object = {
          user_id: id,
          text: user.name+" changed the due_date to "+task.due_date+".",
          date: Date.now()
          }
          task.activity_log.push(object);
        }
    }
    if(project !== null)
    {
        if (task.project !== project.id)
        {
          task.project = project.id;
          const object = {
          user_id: id,
          text: user.name+" added it to the porject - "+project.name+".",
          date: Date.now()
          }
          task.activity_log.push(object);
        }
    }
    if(req.body.name != "")
    {
      task.name=req.body.name;
    }
  }

      task.save(function(err){
        if(err){
          console.log(err.message);
          return;
        }
        else {
          res.sendStatus(200);
        }
      });
  });
  });
});
});

// PUT Individual Task Report
router.put('/task_detail/:id',function(req,res){
  Task.findById(req.params.id,function(err,task){
  Project.findOne({name:req.body.project},function(err,project){
  User.findById(req.user._id,function(err,user){

    const id = req.user._id;

    if(req.body.status)
    {
      if(req.body.status=="checkMark Compelete")
        {
          task.status="Compelete";
          const object = {
            user_id: id,
            text: user.name+" marked this task as Compelete.",
            date: Date.now()
          }
          task.activity_log.push(object);
        }
      else
        {
          task.status="Incomplete";
          const object = {
            user_id: id,
            text: user.name+" marked this task as Incompelete.",
            date: Date.now()
          }
          task.activity_log.push(object);
        }
    }
    else {

    if(req.body.assigned_to != "")
    {
      if(task.assigned_to!==req.body.assigned_to)
      {
        task.assigned_to=req.body.assigned_to;
        const object = {
        user_id: id,
        text: user.name+" assigned this task to " + task.assigned_to +".",
        date: Date.now()
        }
        task.activity_log.push(object);
      }
    }

    if(req.body.description != "")
    {
        task.description=req.body.description;
    }
    if(req.body.due_date != "")
    {
        if (task.due_date!==req.body.due_date)
        {
          task.due_date=req.body.due_date;
          const object = {
          user_id: id,
          text: user.name+" changed the due_date to "+task.due_date+".",
          date: Date.now()
          }
          task.activity_log.push(object);
        }
    }
    if(project !== null)
    {
        if (task.project !== project.id)
        {
          task.project = project.id;
          const object = {
          user_id: id,
          text: user.name+" added it to the porject - "+project.name+".",
          date: Date.now()
          }
          task.activity_log.push(object);
        }
    }
    if(req.body.name != "")
    {
      task.name=req.body.name;
    }
  }

      task.save(function(err){
        if(err){
          console.log(err.message);
          return;
        }
        else {
          res.sendStatus(200);
        }
      });
  });
  });
});
});

//GET Registration of Invited User
router.get('/invited/:id',function(req,res){
  Token.find({token:req.params.id}).exec(function(err,token){
    console.log(token);
  User.findOne(token.user_id).exec(function(err,user){
    console.log(user);
    res.render('register_invited',{
      email: user.email
    });
  });
  });
});


//POST Adding task
router.post('/my_task',function(req,res){
User.findById(req.user._id,function(err,user){

  const id = req.user._id;
  const object = {
    user_id: id,
    text: user.name+" created this task.",
    date: moment()
  }

  let newTask = new Task({
      creator: id,
  });

  newTask.activity_log.push(object);

  newTask.save(function(err){
    if(err){
      console.log(err.message);
      return;
    } else {
      res.redirect('/user/my_task/task/'+newTask._id);
    }
  });

});
});


router.get('/register',function(req,res){
  res.render('register');
});


router.post('/register',[
  check('name').not().isEmpty(),
  check('dob').not().isEmpty(),
  check('gender').not().isEmpty(),
  check('email').not().isEmpty(),
  check('email').isEmail(),
  check('username').not().isEmpty(),
  check('password').not().isEmpty(),
  check('password2').not().isEmpty()],function(req,res){

    const name = req.body.name;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

  /*var temp;
  var query = {email: email}
  User.findOne(query,function(err,user){
    if(err)
    {
      message: err.message;
      return;
    }
    if(user)
    {
      temp=user.email;
    }
    console.log(user);
  });

    if(temp !== null)
  {
    console.log(temp);
    //console.log(user.email);
    req.flash('danger',"Email already exists.");
    res.redirect('/user/register');
    return;
  }


  query = {username: username }
  User.find(query,function(err,user){
    if(err)
    {
      message: err.message;
      return;
    }

    if(user)
    {
      temp= user.username;
    }
  });


  if(temp !== null)
  {
    req.flash('danger',"Username already exists.");
    res.redirect('/user/register');
    return;
  }*/

  if(req.body.password !== req.body.password2)
  {
    req.flash('danger',"Passwords don't match.");
    res.redirect('/user/register');
    return;
  }

  const errors = validationResult(req);

  if(!errors.isEmpty())
  {

      req.flash('danger','Oops!! Something went wrong.');
      req.flash('danger','Please enter valid details.');
      res.redirect('/user/register');
  } else {
      let newUser = new User({
        name: name,
        dob: dob,
        gender: gender,
        email: email,
        username: username,
        password: password

    });

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
          if(err){
            console.log(err.message);
          }
          newUser.password = hash;
          newUser.save(function(err){
            if(err){
              console.log(err.message);
              return;
            } else {

                req.flash('success','You are now registered.');
                res.redirect('/');
            }
          });
        });
    });
  }
});

module.exports = router;
