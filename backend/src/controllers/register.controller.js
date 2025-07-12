const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { generateAvatarSeed, getAvatarUrl } = require('../utils/avator');
const userSchema = require('../schemas/user.schema');

const Register = async (req, res) => {
  try {
    const {email, password, name, location } = req.body;
    
    if ( !email || !password || !name || !location) {
      return res.status(400).json({ 
        success: false,
        message: "All fields (email, password, name, location) are required" 
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 8 characters" 
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide a valid email address" 
      });
    }

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(409).json({ 
        success: false,
        message: "Email already registered" 
      });
    }



    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //utils/avator.js
    const avatarSeed = generateAvatarSeed(name);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      location,
      avatarSeed
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set HTTP-only cookie
    res.cookie('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          _id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          location: newUser.location,
          avatarUrl: getAvatarUrl(avatarSeed),
          points: newUser.points
        },
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(val => val.message)
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Server error during registration",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = Register;