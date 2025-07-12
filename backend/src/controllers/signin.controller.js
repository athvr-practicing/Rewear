const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { getAvatarUrl } = require("../utils/avatarUtils");

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    //export data to frontend
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      avatarUrl: getAvatarUrl(user.avatarSeed),
      points: user.points,
    };

    //response
    res.status(200).json({
      success: true,
      message: "Sign-in successful",
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during sign-in",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = signIn;
