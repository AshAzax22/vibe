const express = require("express");
const {
  searchUser,
  verifyOtpService,
  signupUser,
  loginUser,
  authorizeUser,
  requestOtp,
  updatePassword,
  searchUsername,
  setUserProfile,
  getUser,
  getUserData,
  follow,
  unfollow,
  googleAuth,
} = require("../services/userServices");
const {
  createPoll,
  getPolls,
  updatePoll,
  deletePoll,
  getPoll,
} = require("../services/pollServices");
const { sendErrorResponse } = require("../utils/responseUtils");

const createUserRoutes = (io) => {
  const router = express.Router();

  router.post("/searchUser", async (req, res) => {
    const { email } = req.body;
    try {
      const result = await searchUser(email);
      if (result.exists) {
        return res.status(201).send({ message: "User already exists" });
      } else if (result.otpSent) {
        return res
          .status(202)
          .send({ message: "User does not exist, OTP sent" });
      }
    } catch (error) {
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  });

  router.post("/verifyotp", async (req, res) => {
    const { email, otp } = req.body;
    const result = verifyOtpService(email, otp);
    if (result.verified) {
      return res.status(200).send({ message: "OTP verified successfully" });
    } else {
      return res.status(400).send({ message: "Invalid OTP" });
    }
  });

  router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await signupUser(email, password);
      return res.status(200).json(result);
    } catch (err) {
      sendErrorResponse(res, 400, "Signup failed");
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await loginUser(email, password);
      return res.status(200).json(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.get("/authorize", async (req, res) => {
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
  });

  router.post("/requestOtp", async (req, res) => {
    const { email } = req.body;
    try {
      const result = await requestOtp(email);
      return res.status(200).json(result);
    } catch (err) {
      sendErrorResponse(res, 400, "Error sending OTP");
    }
  });

  router.post("/updatepassword", async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await updatePassword(email, password);
      return res.status(200).json(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.post("/searchusername", async (req, res) => {
    const { username } = req.body;
    try {
      const result = await searchUsername(username);
      return res.status(201).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.post("/googlelogin", async (req, res) => {
    const { email } = req.body;
    try {
      const result = await googleAuth(email);
      return res.status(200).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.post("/setuserprofile", async (req, res) => {
    const { username, index, email } = req.body;
    try {
      const result = await setUserProfile(username, index, email);
      return res.status(200).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.get("/getUser", async (req, res) => {
    const { email } = req.query;
    try {
      const result = await getUser(email);
      return res.status(200).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.post("/createpoll", async (req, res) => {
    const { question, optionsArray, email, date } = req.body;
    try {
      const result = await createPoll(question, optionsArray, email, date, io);
      return res.status(201).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.get("/getpolls", async (req, res) => {
    const { email } = req.query;
    try {
      const result = await getPolls(email);
      return res.status(200).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.post("/poll", async (req, res) => {
    const { pollId, optionIndex, email } = req.body;
    try {
      const result = await updatePoll(pollId, optionIndex, email, io);
      return res.status(205).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.get("/userdata", async (req, res) => {
    const { username } = req.query;
    try {
      const result = await getUserData(username);
      return res.status(200).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.delete("/deletepoll", async (req, res) => {
    const { email, pollid } = req.query;
    try {
      const result = deletePoll(email, pollid, io);
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.get("/getpoll", async (req, res) => {
    const { email, pollId } = req.query;
    try {
      const result = await getPoll(pollId, email);
      return res.status(200).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.post("/follow", async (req, res) => {
    const { userFollowing, userFollowed } = req.body;
    try {
      const result = await follow(userFollowing, userFollowed, io);
      return res.status(200).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  router.post("/unfollow", async (req, res) => {
    const { userUnFollowing, userUnFollowed } = req.body;
    try {
      const result = await unfollow(userUnFollowing, userUnFollowed, io);
      return res.status(200).send(result);
    } catch (err) {
      sendErrorResponse(res, 400, err.message);
    }
  });

  return router;
};

module.exports = createUserRoutes;
