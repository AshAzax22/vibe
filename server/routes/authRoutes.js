const express = require("express");
const {
  handleSearchUser,
  handleVerifyOtp,
  handleSignup,
  handleLogin,
  handleAuthorize,
  handleRequestOtp,
  handleUpdatePassword,
  handleGoogleLogin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/searchUser", handleSearchUser);
router.post("/verifyotp", handleVerifyOtp);
router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/authorize", handleAuthorize);
router.post("/requestOtp", handleRequestOtp);
router.post("/updatepassword", handleUpdatePassword);
router.post("/googlelogin", handleGoogleLogin);

module.exports = router;
