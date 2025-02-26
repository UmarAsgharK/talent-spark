import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const authenticate = async (req, res, next) => {
    try {
        console.log("Incoming request to protected route:", req.method, req.originalUrl); // Log route
        console.log("Request Cookies:", req.cookies); // Log all cookies received
        const token = req.cookies?.accessToken;
        console.log("Extracted accessToken from cookie:", token); // Log extracted token
        if (!token) {
            console.log("No access token found in cookies.");
            return res.status(401).json({ error: "Unauthorized - No access token provided" });
        }
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'YOUR_ACCESS_TOKEN_SECRET');
            console.log("Token successfully verified, decoded payload:", decoded); // Log decoded token payload
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                console.log("User not found in database for decoded ID:", decoded.id);
                return res.status(404).json({ error: "User not found" });
            }
            req.user = user;
            console.log("User authenticated:", user.name, user.email);
            next();
        } catch (err) {
            console.error("Token verification error:", err); // Log full verification error
            if (err.name === "TokenExpiredError") {
                console.log("Token expired.");
                return res.status(401).json({ error: "Token expired" });
            } else {
                return next(err);
            }
        }
    } catch (err) {
        console.error("Error in authenticate middleware:", err); // Log general middleware errors
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
