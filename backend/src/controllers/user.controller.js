/* theory :-
Routes = it defines what endpoints exists and which controller handles it 
Controllers = it defines what happens when a request is made to a particular endpoint
Models = define how data look and is stored in the database
MiddleWare = defines things that should happen before/after the controller logic  

*/




import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";


// access & refresh token used for that user should not give thier userName & password regularly!



// finds the user by thier userIDS  and calls model methods both generateAccess & refresh Tokens
// it stores the new refresh token in the database and returns both tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    console.log("Finding user with ID:", userId);
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    console.log("Generating access token...");
    const accessToken = user.generateAccessToken();
    console.log("Access token generated:", accessToken ? "Success" : "Failed");
    
    console.log("Generating refresh token...");
    const refreshToken = user.generateRefreshToken();
    console.log("Refresh token generated:", refreshToken ? "Success" : "Failed");

    user.refershToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

// extracts userData From the request body
const registerUser = asyncHandler(async (req, res) => {
  // Debug: Log what we receive
  console.log("Request body:", req.body);
  console.log("Request files:", req.files);

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

  // Upload files to cloudinary (both are optional now)
  const avatar = avatarLocalPath ? await uploadOnCloudinary(avatarLocalPath) : null;
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  // Create user object - create entry in db
  const user = await User.create({
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    password,
    userName: userName.toLowerCase().trim(),
    avatar: avatar?.url || "https://via.placeholder.com/150", // Use placeholder if no avatar
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


// extracting login credentials from request body
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  // find theUser by username or email
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


// verify password using bcrypt method
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingUser._id);


  // generate tokens 
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

  // remove the user's refresh token from DB
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

// handles generating a new access token when it expires using the refresh token
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

   // generate new tokens and send them in response 
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

// changing password for current logged in user
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


// update account details for current logged in user
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

// update user avatar for current logged in user
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


const getWatchHistory = asyncHandler(async (req, res) => {
 const user = await User.aggregate([
  {
    $match: {
      _id: new mongoose.Types.ObjectId(req.user?._id)
    }
  },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistoryVideos",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "uploader",
              foreignField: "_id",
              as: "ownerDetails",
              pipeline:[
                {
                  $project: {
                    fullName:1,
                    userName:1,
                    avatar:1,
                  }
                }
              ]
          }
        },
        {
          $addFields: {
            owner: { $arrayElemAt: ["$ownerDetails", 0] }
          }
        }
        ]
    }
}

])

return res
.status(200)
.json(
    new ApiResponse(
        200,
        user[0]?.watchHistoryVideos || [],
        "User watch history fetched successfully"
    )
  )

});

export { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory };