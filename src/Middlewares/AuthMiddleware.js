const jwt = require("jsonwebtoken");
const User = require("../model/User");
 
// 🔐 AUTH MIDDLEWARE (Login check + user attach)
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check header
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "No token, unauthorized"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get full user from DB
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;