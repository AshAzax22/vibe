// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../models/users");
const mailer = require("../mailer");
const { generateOtp, storeOtp, verifyOtp, deleteOtp } = require("../otp");
const { generateToken, verifyToken } = require("../jwt");

router.post("/searchUser", async (req, res) => {
  let { email } = req.body;
  try {
    const user = await users.findOne({ email: email });
    if (user) {
      return res.status(201).send({ message: "User already exists" });
    } else {
      const otp = generateOtp();
      storeOtp(email, otp);
      mailer(email, "otp", { otp });
      return res.status(202).send({ message: "User does not exist, OTP sent" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/verifyotp", async (req, res) => {
  const { email, otp } = req.body;
  if (verifyOtp(email, otp)) {
    res.status(200).send({ message: "OTP verified successfully" });
    deleteOtp(email);
  } else {
    return res.status(400).send({ message: "Invalid OTP" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const user = new users({
      email,
      password: hashed_password,
    });
    await user.save();
    mailer(email, "manualSignup", { text: "none" });
    const payload = { email: email };
    const token = generateToken(payload);
    return res
      .status(200)
      .json({ token: token, message: "successfully signed up", email: email });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "signup failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user doesn't exist" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "incorrect password" });
    }
    const payload = { email: email };
    const token = generateToken(payload);
    return res
      .status(200)
      .json({ token: token, message: "successfully logged in", email: email });
  } catch (err) {
    res.status(400).json({ message: "login failed" });
  }
});

router.get("/authorize", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const payload = verifyToken(token);
    const user = await users.findOne({ email: payload.email });
    if (user) {
      return res.status(200).send({ message: "Authorized" });
    } else {
      return res.status(401).send({ message: "Unauthorized" });
    }
  } catch {
    res.status(401).send({ message: "Unauthorized" });
  }
});

router.post("/requestOtp", async (req, res) => {
  const { email } = req.body;
  try {
    const otp = generateOtp();
    storeOtp(email, otp);
    mailer(email, "forgotPassword", { otp });
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(400).json({ message: "error sending OTP" });
  }
});

router.post("/updatepassword", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const user = await users.findOne({ email });
    if (user) {
      user.password = hashed_password;
      await user.save();
      return res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Password update failed" });
  }
});

router.post("/searchusername", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await users.findOne({ username });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    } else {
      return res.status(201).send({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/setuserprofile", async (req, res) => {
  console.log("accessed");
  const { username, index, email } = req.body;
  try {
    console.log(username, index, email);
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "update failed" });
    }
    console.log("got user");
    user.username = username;
    user.avatar = index;
    await user.save();

    return res.status(200).send("successfully updated user Profile");
  } catch (err) {
    return res.status(400).send("failed to update user profile");
  }
});

module.exports = router;
