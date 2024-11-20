const bcrypt = require("bcrypt");
const users = require("../db/models/users");
const mailer = require("../mailer/mailer");
const {
  generateOtp,
  storeOtp,
  verifyOtp,
  deleteOtp,
} = require("../utils/otpUtils");
const { generateToken, verifyToken } = require("../utils/jwtUtils");

const searchUser = async (email) => {
  const user = await users.findOne({ email });
  if (user) {
    return { exists: true };
  } else {
    const otp = generateOtp();
    storeOtp(email, otp);
    mailer(email, "otp", { otp });
    return { exists: false, otpSent: true };
  }
};

const verifyOtpService = (email, otp) => {
  if (verifyOtp(email, otp)) {
    deleteOtp(email);
    return { verified: true };
  } else {
    return { verified: false };
  }
};

const signupUser = async (email, password) => {
  const hashed_password = await bcrypt.hash(password, 10);
  const user = new users({ email, password: hashed_password });
  await user.save();
  mailer(email, "manualSignup", { text: "none" });
  const token = generateToken({ email });
  return { token, message: "successfully signed up", email };
};

const loginUser = async (email, password) => {
  const user = await users.findOne({ email });
  if (!user) {
    throw new Error("user doesn't exist");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("incorrect password");
  }

  const token = generateToken({ email });
  return { token, message: "successfully logged in", email };
};

const authorizeUser = async (token) => {
  const payload = verifyToken(token);
  const user = await users.findOne({ email: payload.email });
  if (user) {
    return { authorized: true };
  } else {
    throw new Error("Unauthorized");
  }
};

const requestOtp = async (email) => {
  const otp = generateOtp();
  storeOtp(email, otp);
  mailer(email, "forgotPassword", { otp });
  return { message: "OTP sent successfully" };
};

const updatePassword = async (email, password) => {
  const hashed_password = await bcrypt.hash(password, 10);
  const user = await users.findOne({ email });
  if (user) {
    user.password = hashed_password;
    await user.save();
    return { message: "Password updated successfully" };
  } else {
    throw new Error("User not found");
  }
};

const searchUsername = async (username) => {
  const user = await users.findOne({ username });
  if (user) {
    throw new Error("User already exists");
  } else {
    return { message: "User does not exist" };
  }
};

const setUserProfile = async (username, index, email) => {
  const user = await users.findOne({ email });
  if (!user) {
    throw new Error("update failed");
  }
  user.username = username;
  user.avatar = index;
  await user.save();
  return { message: "successfully updated user Profile" };
};

const getUser = async (email) => {
  const user = await users.findOne({ email });
  if (!user) {
    throw new Error("user not found");
  }
  return { username: user.username, avatar: user.avatar };
};

const getUserData = async (email) => {
  const user = await users
    .findOne({ email })
    .populate({
      path: "pollsCreated",
      select: "_id question date options",
      populate: { path: "options", select: "voters" },
    })
    .populate({
      path: "pollsVoted",
      select: "_id question date options",
      populate: { path: "options", select: "voters" },
    });

  if (!user) {
    throw new Error("User not found");
  }

  const mapPolls = (polls) =>
    polls.map((poll) => ({
      pollId: poll._id,
      date: poll.date,
      question: poll.question,
      votes: poll.options.reduce(
        (acc, option) => acc + option.voters.length,
        0
      ),
    }));

  return {
    username: user.username,
    avatar: user.avatar,
    pollsCreated: mapPolls(user.pollsCreated),
    pollsVoted: mapPolls(user.pollsVoted),
  };
};

module.exports = {
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
};
