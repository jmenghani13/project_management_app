// const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const mongoose = require('mongoose');
//
//
// let User = require('../models/user');
// let Project = require('../models/project');
// let Task = require('../models/task');
// let Token = require('../models/token');
// let Workspace = require('../models/workspace');
//
// //GET First Page
// router.get('/',function(req,res){
//
//     Workspace.findOne({$or:[{creator:req.user._id},{team_member:{$in:[req.user.id]}}]}).exec(function(err,workspace){
//       if(err)
//       {
//         console.log(err.message);
//       }
//       else{
//         if(workspace !== null)
//         {
//           res.redirect("/workspace/"+workspace.id);
//         }
//         else {
//           res.render('one_time');
//         }
//       }
//   });
// });
//
// //POST New workspace
// router.post('/',function(req,res){
//
//   const name = req.body.team_name;
//
//
//   let newWorkspace = new Workspace({
//     name: name,
//     date: Date.now(),
//     creator: req.user._id
//   })
//
//   newWorkspace.team_member.push(req.user._id);
//
//   newWorkspace.save(function(err){
//             if(err){
//               console.log(err.message);
//               return;
//             }
//             else{
//               res.redirect('/workspace/'+newWorkspace.id);
//             }
//           });
// });
//
// //GET Home page
// router.get('/:id',ensureAuthenticated,function(req,res){
//
//   Workspace.find({$or:[{creator:req.user._id},{team_member:{$in:[req.user.id]}}]}).exec(function(err,workspaces){
//   Workspace.findById(req.params.id).populate('team_member','name email').exec(function(err,workspace){
//   User.findById(req.user._id,function(err,user){
//   Project.find({}).populate('creator','name').exec(function(err,projects){
//   Task.find({creator : req.user._id}).exec(function(err,tasks){
//     res.render('home',{
//       user: user,
//       projects: projects,
//       tasks: tasks,
//       workspaces: workspaces,
//       workspace : workspace
//     });
//
//   });
//   });
//   });
//   });
//   });
//
// });
//
// //POST Invitng user
// router.post('/:id',function(req,res){
//
//   crypto.randomBytes(16, function(err, buffer) {
//
//     var token = buffer.toString('hex');
//
//     let newToken = new Token({
//     user_id: req.user._id,
//     token: token
//     });
//
//     newToken.save(function(err){
//       if(err){
//         console.log(err.message);
//         return;
//       }
//     });
//
//     var transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: '587',
//       auth: {
//         user: 'jayesh.temporary13@gmail.com',
//         pass: 'test12345$'
//       },
//       secureConnection: 'false',
//       tls: {
//         ciphers: 'SSLv3',
//         rejectUnauthorized: false
//       }
//     });
//
//     //console.log(transporter);
//
//     var mailOptions = {
//       from: 'jayesh.temporary13@gmail.com',
//       to: req.body.email,
//       subject: 'Sending Email using Node.js',
//       html:'<h1>Hey there!</h1><p>You have been invited</p><p>Click <a href="http://localhost:4000/user/invited/'+token+'">here</a> to join the team</p>'
//     };
//
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//         res.sendStatus(200);
//       }
//     });
//
//   });
// });
// //GET New project
// router.get('/:id/project/new',function(req,res){
//   res.render('new_project',{
//     workspace_id: req.params.id
//   });
// });
//
// //POST New Project
// router.post('/:id/project/new',function(req,res){
//
//   const name = req.body.pro_name;
//   const date = Date.now();
//   const workspace = req.params.id;
//
//   let newProject = new Project({
//     name: name,
//     date: date,
//     creator: req.user._id,
//     workspace: workspace
//   })
//
//   newProject.save(function(err){
//             if(err){
//               console.log(err.message);
//               return;
//             }
//             else{
//               req.flash('success','New project added.');
//               res.redirect('/workspace/'+workspace);
//             }
//           });
// });
//
// //GET Project Tasks
// router.get("/:id/project/project_task/:id2",function(req,res){
//
//   Workspace.find({$or:[{creator:req.user._id},{team_member:{$in:[req.user.id]}}]}).exec(function(err,workspaces){
//   Workspace.findById(req.params.id).populate('team_member','name').exec(function(err,workspace){
//   Task.findById(req.params.id,function(err,task){
//   Task.find({},function(err,tasks){
//   Project.findById(req.params.id2,function(err,project){
//   Project.find({}).populate('creator','name').exec(function(err,projects){
//     res.render('project_task',{
//       project: project,
//       projects: projects,
//       tasks: tasks,
//       task: task,
//       workspace: workspace,
//       workspaces: workspaces
//     });
//   });
//   });
//   });
//   });
//   });
//   });
// });
//
// //GET Project Task's Details
// router.get('/:id/project/project_task/project_task_details/:id2',function(req,res){
//
//   Workspace.find({$or:[{creator:req.user._id},{team_member:{$in:[req.user.id]}}]}).exec(function(err,workspaces){
//   Task.findById(req.params.id2,function(err,task){
//   Project.findById(task.project,function(err,project){
//   Workspace.findById(project.workspace,function(err,workspace){
//   User.find({}).exec(function(err,users){
//   Task.find({}).exec(function(err,tasks){
//   Project.find({}).populate('creator','name').exec(function(err,projects){
//     res.render('project_task_details',{
//       projects: projects,
//       users: users,
//       project: project,
//       task: task,
//       tasks: tasks,
//       workspaces: workspaces,
//       workspace: workspace
//
//     });
//   });
//   });
//   });
//   });
//   });
//   });
//   });
// });
//
// //POST
// router.post('/:id/project/project_task/:id2',function(req,res){
//
//   Workspace.find({$or:[{creator:req.user._id},{team_member:{$in:[req.user.id]}}]}).exec(function(err,workspaces){
//   Workspace.findById(req.params.id).populate('team_member','name').exec(function(err,workspace){
//
//   const user_id = req.user._id;
//   const date = Date.now();
//   const project_id = req.params.id2;
//
//   let newTask = new Task({
//       creator: user_id,
//       date: date,
//       project: project_id
//   });
// //console.log(newTask);
// //console.log(newTask.project);
//
//   newTask.save(function(err){
//     if(err){
//       console.log(err.message);
//       return;
//     } else {
//       res.redirect("/workspace/"+workspace.id+"/project/project_task/project_task_details/" + newTask.id);
//     }
//   });
//
//
// });
// });
// });
//
//
//
// module.exports = router;
