const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    token:{
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 25200 }
});

module.exports = mongoose.model('Token',tokenSchema);


// var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
