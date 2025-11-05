import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";


// this is the main middleware to verify JWT token and protect secured routes
export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        //token extraction
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");


        // missing token checking
        if (!token) {
            throw new ApiError(401, "Access token is missing");
        }

        try {
            // token verification
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
           // finding user in database
            const user = await User.findById(decodedToken._id).select("-password -refershToken");

            // invalid user handling
            if (!user) {
                throw new ApiError(401, "Invalid Access Token");
            }

            // adding user access to {req} object
            req.user = user;
            next();
            // token error handling
        } catch (jwtError) {
            throw new ApiError(401, "Invalid or expired token");
        }
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
})
