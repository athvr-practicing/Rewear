const { getAvatarUrl } = require('../utils/avator');

const getMe = async (req, res) => {
  try {
    // User is already attached to req by isLoggedIn middleware
    const user = req.user;
    
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      avatarUrl: getAvatarUrl(user.avatarSeed),
      points: user.points,
      location: user.location
    };

    res.status(200).json({
      success: true,
      message: "User authenticated",
      data: {
        user: userData
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: "Server error getting user data",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { getMe }; 