import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // used for faster search

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true // used for faster search

    },
    avatar: {
        type: String, // cloudinary URL
        required: true,


    },
    coverImage: {
        type: String, // cloudinary URL
    },
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: "Video",
    },
    password: {
        type: String,
        required: [true, "Password is required"],

    },
    refershToken: {
        type: String,
    }


})

// password HashingMiddleware
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) 
        return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
} )

//Password Comparison Method
userSchema.methods.isPasswordMatched  =  async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}  

// generation of access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

// generation of refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
          _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )

}

export const User = mongoose.model("User", userSchema);