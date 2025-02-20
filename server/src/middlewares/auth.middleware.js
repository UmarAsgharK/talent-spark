// src/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const authenticate = async (req, res, next) => {
    try {
        // Retrieve the token from the HTTP‑only cookie.
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No access token provided" });
        }
        try {
            // Verify the token. Our payload contains { id, role }.
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'YOUR_ACCESS_TOKEN_SECRET');

            // Use decoded.id (not decoded.userId)
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            req.user = user;
            next();
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token expired" });
            } else {
                return next(err);
            }
        }
    } catch (err) {
        console.log("Error in authenticate middleware", err);
        return res.status(401).json({ error: "Invalid token" });
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied" });
        }
        next();
    };
};
