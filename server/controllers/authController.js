const {
  searchUser,
  verifyOtpService,
  signupUser,
  loginUser,
  authorizeUser,
  requestOtp,
  updatePassword,
  googleAuth,
} = require("../services/userServices");
const { sendErrorResponse } = require("../utils/responseUtils");

const handleSearchUser = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await searchUser(email);
    if (result.exists) {
      return res.status(201).send({ message: "User already exists" });
    } else if (result.otpSent) {
      return res.status(202).send({ message: "User does not exist, OTP sent" });
    }
  } catch (error) {
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const handleVerifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const result = verifyOtpService(email, otp);
  if (result.verified) {
    return res.status(200).send({ message: "OTP verified successfully" });
  } else {
    return res.status(400).send({ message: "Invalid OTP" });
  }
};

const handleSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await signupUser(email, password);
    return res.status(200).json(result);
  } catch (err) {
    sendErrorResponse(res, 400, "Signup failed");
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    return res.status(200).json(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleAuthorize = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return sendErrorResponse(res, 401, "Unauthorized");
  }
  try {
    const result = await authorizeUser(token);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 401, err.message);
  }
};

const handleRequestOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await requestOtp(email);
    return res.status(200).json(result);
  } catch (err) {
    sendErrorResponse(res, 400, "Error sending OTP");
  }
};

const handleUpdatePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await updatePassword(email, password);
    return res.status(200).json(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleGoogleLogin = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await googleAuth(email);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

module.exports = {
  handleSearchUser,
  handleVerifyOtp,
  handleSignup,
  handleLogin,
  handleAuthorize,
  handleRequestOtp,
  handleUpdatePassword,
  handleGoogleLogin,
};
