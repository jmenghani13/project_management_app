const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

let User = require('../models/user');
let Project = require('../models/project');
let Task = require('../models/task');
let Token = require('../models/token');

router.get('/',ensureAuthenticated,function(req,res){

  User.findById(req.user._id,function(err,user){
  Project.findOne({creator : req.user._id}).populate('creator','name').exec(function(err,project){
  Project.find({}).populate('creator','name').exec(function(err,projects){
  Task.find({creator : req.user._id}).exec(function(err,tasks){
    if(err)
    {
      console.log(err.message);
    }
    else{
      res.render('home',{
        user: user,
        projects: projects,
        tasks: tasks,
        project: project
      });
    }
  });
  });
  });
  });
});

//GET New project
router.get('/new',function(req,res){
  res.render('new_project');
});


router.post('/new',function(req,res){

  const name = req.body.pro_name;
  const date = Date.now();

  let newProject = new Project({
    name: name,
    date: date,
    creator: req.user._id
  })

  newProject.save(function(err){
            if(err){
              console.log(err.message);
              return;
            }
            else{
              req.flash('success','New project added.');
              res.redirect('/project');
            }
          });
});

router.post('/',function(req,res){

  crypto.randomBytes(16, function(err, buffer) {

    var token = buffer.toString('hex');

    let newToken = new Token({
    user_id: req.user._id,
    token: token
    });

    newToken.save(function(err){
      if(err){
        console.log(err.message);
        return;
      }
    });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jayesh.temporary13@gmail.com',
        pass: 'test12345$'
      }
    });

    var mailOptions = {
      from: 'jayesh.temporary13@gmail.com',
      to: req.body.email,
      subject: 'Sending Email using Node.js',
      html:'<h1>Hey there!</h1><p>You have been invited</p><p>Click <a href="http://localhost:4000/user/invited/'+token+'">here</a> to join the team</p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.sendStatus(200);
      }
    });

  });
});

router.get("/project_task/:id",function(req,res){
  Task.find({},function(err,tasks){
  Project.findById(req.params.id,function(err,project){
  Project.find({}).populate('creator','name').exec(function(err,projects){
    res.render('project_task',{
      project: project,
      projects: projects,
      tasks: tasks
    });
  });
  });
  });
});


router.get('/project_task/project_task_details/:id',ensureAuthenticated,function(req,res){
  Task.findById(req.params.id,function(err,task){
  Project.findOne({}).exec(function(err,project){
  Task.find({}).exec(function(err,tasks){
  User.find({}).exec(function(err,users){
  Project.find({}).populate('creator','name').exec(function(err,projects){
    res.render('project_task_details',{
      projects: projects,
      users: users,
      project: project,
      task: task,
      tasks: tasks
    });
  });
  });
  });
  });
  });
});


router.post('/project_task/:id',function(req,res){

  const user_id = req.user._id;
  const date = Date.now();
  const project_id = req.params.id;

  let newTask = new Task({
      creator: user_id,
      date: date,
      project: project_id
  });

  newTask.save(function(err){
    if(err){
      console.log(err.message);
      return;
    } else {
      res.redirect('/project/project_task/project_task_details/'+newTask._id);
    }
  });


});



router.put('/project_task/project_task_details/:id',function(req,res){
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

    console.log(req.body.name);
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


function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger','Please login');
    res.redirect('/');
  }
}


module.exports = router;
