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

const generateRandomPassword = (length = 8) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const googleAuth = async (email) => {
  const user = await users.findOne({ email });
  if (user) {
    const token = generateToken({ email });
    return { token, message: "successfully logged in", email };
  } else {
    const temporaryPassword = generateRandomPassword();
    const hashed_password = await bcrypt.hash(temporaryPassword, 10);
    const user = new users({ email });
    user.password = hashed_password;
    await user.save();
    mailer(email, "googleAuth", { temporaryPassword });
    const token = generateToken({ email });
    return { token, message: "successfully signed up", email, newUser: true };
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
  return { username: user.username, avatar: user.avatar, _id: user._id };
};

const getUserData = async (username) => {
  const user = await users
    .findOne({ username })
    .populate({
      path: "pollsCreated",
      select: "_id question date options",
      populate: { path: "options", select: "voters" },
    })
    .populate({
      path: "pollsVoted",
      select: "_id question date options",
      populate: { path: "options", select: "voters" },
    })
    .populate({
      path: "followers",
      select: "username -_id", // Include only the username field and exclude the _id field
    })
    .populate({
      path: "following",
      select: "username -_id", // Include only the username field and exclude the _id field
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

  const followersUsernames = user.followers.map(
    (follower) => follower.username
  );
  const followingUsernames = user.following.map(
    (followed) => followed.username
  );

  return {
    _id: user._id,
    username: user.username,
    avatar: user.avatar,
    pollsCreated: mapPolls(user.pollsCreated),
    pollsVoted: mapPolls(user.pollsVoted),
    followers: followersUsernames,
    following: followingUsernames,
  };
};

const follow = async (userFollowing, userFollowed, io) => {
  const user1 = await users.findOne({ username: userFollowing });
  const user2 = await users.findOne({ username: userFollowed });
  if (!user1 || !user2) {
    throw new Error("User not found");
  }
  if (user1 == user2) {
    throw new Error("Cannot follow yourself");
  }
  if (user1.following.includes(user2._id)) {
    throw new Error("Already following");
  }

  user1.following.push(user2._id);
  user2.followers.push(user1._id);

  io.to(user1._id.toString()).emit("following", { username: user2.username }); //notification to user1 that he followed user2
  io.to(user2._id.toString()).emit("followed", { username: user1.username }); //notification to user2 that he is followed by user1

  await user1.save();
  await user2.save();

  return { message: "successfully followed" };
};

const unfollow = async (userUnFollowing, userUnFollowed, io) => {
  const user1 = await users.findOne({ username: userUnFollowing });
  const user2 = await users.findOne({ username: userUnFollowed });
  if (!user1 || !user2) {
    throw new Error("User not found");
  }
  if (user1 == user2) {
    throw new Error("Cannot unfollow yourself");
  }
  if (!user1.following.includes(user2._id)) {
    throw new Error("Not following");
  }

  user1.following = user1.following.filter(
    (_id) => _id.toString() !== user2._id.toString()
  );
  user2.followers = user2.followers.filter(
    (_id) => _id.toString() !== user1._id.toString()
  );

  await user1.save();
  await user2.save();

  io.to(user1._id.toString()).emit("unfollowing", { username: user2.username }); //notification to user1 that he unfollowed user2
  io.to(user2._id.toString()).emit("unfollowed", { username: user1.username }); //notification to user2 that he is unfollowed by user1

  return { message: "successfully unfollowed" };
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
  follow,
  unfollow,
  googleAuth,
};
