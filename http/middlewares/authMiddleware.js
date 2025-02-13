import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import responseHelper from "#utils/responseHelper.js";
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
    
    if (!token) {
        return responseHelper.unauthorizedResponse(res, "Unauthorized: No token provided");
    }

    try {
        console.info(JWT_SECRET);
        const decoded = jwt.verify(token, JWT_SECRET); // Verify token
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return responseHelper.unauthorizedResponse(res, "Unauthorized: Invalid token");
    }
};

export default authMiddleware;
