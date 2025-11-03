import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";


// access & refresh token used for that user should not give thier userName & password regularly!



const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from request body
  const { fullName, email, userName, password } = req.body;

  // Validation - check if all required fields are provided
  if (!fullName || !email || !userName || !password) {
    throw new ApiError(400, "All fields are required: fullName, email, userName, password");
  }

  // Validation - check if fields are empty after trimming
  if ([fullName, email, userName, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields must contain valid data");
  }

  // Check if user already exists (by email or username)
  const existingUser = await User.findOne({
    $or: [{ userName: userName.toLowerCase() }, { email: email.toLowerCase() }]
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Handle file uploads
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  // Check if avatar is provided (required field)
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload files to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar");
  }

  // Create user object - create entry in db
  const user = await User.create({
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    password,
    userName: userName.toLowerCase().trim(),
    avatar: avatar.url,
    coverImage: coverImage?.url || ""
  });

  // Remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Return response
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!existingUser) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordMatched = await existingUser.isPasswordMatched(password);
  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingUser._id);

  const loggedInUser = await User.findById(existingUser._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});


const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if(!incomingRefreshToken) {
    throw new ApiError(401, "UnAuthorized, Request");
  
  }
 try {
     const decodedToken = jwt.verify(incomingRefreshToken, 
       process.env.REFRESH_TOKEN_SECRET
     )
 
   const user =  await User.findById(decodedToken._id);
   if(!user) {
       throw new ApiError(401, "Invalid RefreshToken");
     
     }
     if(incomingRefreshToken !== user?.refreshToken) {
       throw new ApiError(401, "Refresh Token is Expired");
     }
 
   const options ={
       httpOnly: true,
       secure: true,
   }
   const {accessToken, newrefreshToken} = await generateAccessAndRefreshTokens(user._id)
 
   return res
   .status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", newrefreshToken, options)
   .json(
       new ApiResponse(
           200,
           { accessToken, refreshToken: newrefreshToken },
           "Access token refreshed successfully"
       ) 
     )
 
 } catch (error) {
  throw new ApiError(401, "Invalid or expired Refresh Token");
 }


});


const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword} = req.body;



  const user = await User.findById(req.user?._id)
  const isPasswordMatched = await user.isPasswordMatched(currentPassword);

  if(!isPasswordMatched) {
  throw new ApiError(400, "Current Password is incorrect");   
}
user.password = newPassword;
await user.save({validateBeforeSave: false});

return res
.status(200)
.json(
    new ApiResponse(
        200,
        null,
        "Password changed successfully"
    )
  )

})

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
  .status(200)
  .json(
      new ApiResponse(
          200,
          req.user,
          "Current user fetched successfully"
      )
    )
})

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, userName, bio } = req.body;

  if(!fullName || !email) {
    throw new ApiError(400, "fullName and email are required");
  }

const user = await User.findByIdAndUpdate(
  req.user?._id,
  {
    $set: {
      fullName,
      email,
      bio,
    }
  },
  { new: true}
)
.select("-password -refreshToken");

return res
.status(200)
.json(
    new ApiResponse(
        200,
        user,
        "Account details updated successfully"
    )
  )

})

const updateUserAvatar = asyncHandler(async (req, res) => {
 const avatarLocalPath = req.file?.path

 if(!avatarLocalPath) {
  throw new ApiError(400, "Avatar file is Missing");
 }



 const avatar = await uploadOnCloudinary(avatarLocalPath);
 
 if(!avatar.url) {
  throw new ApiError(500, "Unable to upload avatar. Please try again later.");
 }

 const user = await User.findByIdAndUpdate(
  req.user?._id,
  {
    $set: {
      avatar: avatar.url,
    }
  },
  {new: true}
  
 ).select("-password -refreshToken");

 return res
 .status(200)
 .json(
     new ApiResponse(
         200,
         User,
         "User avatar updated successfully"
     )
   )

})


const updateUserCoverImage = asyncHandler(async (req, res) => {
 const coverImageLocalPath = req.file?.path

 if(!coverImageLocalPath) {
  throw new ApiError(400, "CoverImage  file is Missing");
 }



 const coverImage = await uploadOnCloudinary(avatarLocalPath);
 
 if(!coverImage.url) {
  throw new ApiError(500, "Unable to upload avatar. Please try again later.");
 }

 await User.findByIdAndUpdate(
  req.user?._id,
  {
    $set: {
      avatar: avatar.url,
    }
  },
  {new: true}
  
 ).select("-password -refreshToken");

 return res
 .status(200)
 .json(
     new ApiResponse(
         200,
         User,
         "User cover image updated successfully"
     )
   )

})

const getUserChannelProfile =  asyncHandler(async(req,res) => {
  const {userName} =req.params
  if(!userName) {
    throw new ApiError(400, "Username is Missing");
  }

  const channel = await User.aggregate([
    {
      $match: 
      {userName: userName?.toLowerCase}
    },
    {

      // 1st Pipeline 
      $lookup:{
        from : "subcriptions",
        localField: "_id",
        foreignField: "channelId",
        as: "subscribersData"
    },
    },

    // 2nd Pipeline
    {
      $lookup:{
        from : "subcriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo"
    },
    },
    

    //3rd Pipeline
    {
    $addFields: {
      // this is the method of counting the numbers of subscribers {$ signs make it field }
      subscribersCount: { $size: "$subscribersData" },
      channelsSubscribedToCount: { $size: "$subscribedTo" },
      isSubscribed:{
        $cond:{
          if:{
            $in: [req.user?._id, "$subscribersData.subscriber"]
          },
          then: true,
          else: false
        }
      }
    }
    },

    //4th Pipeline
 {
    $project: {
      fullName:1,
      userName:1,
      avatar:1,
      coverImage:1,
      subscribersCount:1,
      channelsSubscribedToCount:1,
      isSubscribed:1,
      bio:1,
      createdAt:1,
      email:1,
    }
  }
  ])

  if(!channel?.length) {
    throw new ApiError(404, "Channel not found");
  }

  return res
  .status(200)
  .json(
      new ApiResponse(
          200,
          channel[0],
          "User channel profile fetched successfully"
      )
    )
})

export { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile };