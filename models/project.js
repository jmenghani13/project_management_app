const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  date: {
    type: Date,
    required: true
  },
  creator:{
    type: Object,
    ref: 'User',
    required: true
  },
  team_member: [{ type: Object, ref: 'User' }]
});

module.exports = mongoose.model('Project',projectSchema);
