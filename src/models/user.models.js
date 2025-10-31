import mongoose, { Schema } from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcryptjs";


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


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) 
        return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
} )

userSchema.methods.isPasswordMatched  =  async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}  


userSchema.methodsgenerateAccessToken = function() {
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
userSchema.methodsgenerateRefreshToken = function() {
    return jwt.sign({
          _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_EXPIRY_TOKEN
    }
    )

}

export const User = mongoose.model("User", userSchema);