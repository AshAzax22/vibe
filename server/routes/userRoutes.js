const express = require("express");
const {
  handleSearchUsername,
  handleSetUserProfile,
  handleGetUser,
  handleGetUserData,
  handleFollow,
  handleUnfollow,
  handleUpdateUserProfile,
  handleGetTrendingUsers,
  handleSearchUsers,
} = require("../controllers/userController");

const createUserRoutes = (io) => {
  const router = express.Router();

  router.post("/searchusername", handleSearchUsername);
  router.post("/setuserprofile", handleSetUserProfile);
  router.get("/getUser", handleGetUser);
  router.get("/userdata", handleGetUserData);
  router.post("/follow", handleFollow(io));
  router.post("/unfollow", handleUnfollow(io));
  router.post("/updateuserprofile", handleUpdateUserProfile(io));
  router.get("/trendingUsers", handleGetTrendingUsers);
  router.get("/searchUsers", handleSearchUsers);

  return router;
};

module.exports = createUserRoutes;
