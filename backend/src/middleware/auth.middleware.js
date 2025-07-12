const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Make sure to import your User model

async function isLoggedIn(req, res, next) {
    try {
        // Check for token in cookies or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Authentication required" 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shhhhh', {
            algorithms: ['HS256']
        });

        // Find the user in database
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Attach full user object to request
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid token",
                error: "INVALID_TOKEN"
            });
        }
        
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ 
                success: false,
                message: "Token expired",
                error: "TOKEN_EXPIRED"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication failed"
        });
    }
}

module.exports = isLoggedIn;