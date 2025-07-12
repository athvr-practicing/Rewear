const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  points: {
    type: Number,
    default: 50
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatarSeed: {
    type: String,
  },
  location: {
    type: String
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);