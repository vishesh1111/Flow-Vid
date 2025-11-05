import { Router } from "express";
import { 
    loginUser, 
    registerUser, 
    logoutUser, 
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"; // multer for fileUploads

const router = Router();


// register route with file uploads for avatar and cover image
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);



// router.route("/login").post(loginUser); // Comment out until loginUser is implemented
router.route("/login").post(loginUser); // Placeholder for login route

//secured routes
router.route("/logout").post(verifyJWT , logoutUser);
router.route("./refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);        
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/updateAccountdetails").patch(verifyJWT, updateAccountDetails);    
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/c/:userName").get(verifyJWT, getUserChannelProfile);
router.route("/history").get(verifyJWT, getWatchHistory);

export default router;