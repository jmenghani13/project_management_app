const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name:{
    type:String,
    default: ""
  },
  creator:{
    type: Object,
    ref: 'User',
    required:true
  },
  status:{
    type: String,
    default: "Incomplete"
  },
  due_date:{
    type: String,
    default: ""
  },
  description:{
    type:String,
    default: ""
  },
  assigned_to:{
    type:String,
    default: ""
  },
  project:{
    type: Object,
    ref: 'Project'
  },
  activity_log:[{
    user_id:{ type: Object, ref: 'User' },
    text:{ type: String},
    date:{ type: Date}
  }]
});

module.exports = mongoose.model('Task',taskSchema);
