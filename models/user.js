const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name:{
    type:String,
  },
  dob:{
    type: Date,
      },
  gender:{
    type: String,
  },
  email:{
    type:String,
  },
  username:{
    type:String,
  },
  password:{
    type:String,
  }
});

module.exports = mongoose.model('User',userSchema);
