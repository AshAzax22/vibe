const {
  searchUsername,
  setUserProfile,
  getUser,
  getUserData,
  follow,
  unfollow,
  updateUserProfile,
  getTrendingUsers,
  searchUsers,
} = require("../services/userServices");
const { sendErrorResponse } = require("../utils/responseUtils");

const handleSearchUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const result = await searchUsername(username);
    return res.status(201).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleSetUserProfile = async (req, res) => {
  const { username, index, email } = req.body;
  try {
    const result = await setUserProfile(username, index, email);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleGetUser = async (req, res) => {
  const { email } = req.query;
  try {
    const result = await getUser(email);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleGetUserData = async (req, res) => {
  const { username } = req.query;
  try {
    const result = await getUserData(username);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleFollow = (io) => async (req, res) => {
  const { userFollowing, userFollowed } = req.body;
  try {
    const result = await follow(userFollowing, userFollowed, io);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleUnfollow = (io) => async (req, res) => {
  const { userUnFollowing, userUnFollowed } = req.body;
  try {
    const result = await unfollow(userUnFollowing, userUnFollowed, io);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleUpdateUserProfile = (io) => async (req, res) => {
  const { email, userData } = req.body;
  try {
    const result = await updateUserProfile(email, userData, io);
    return res.status(result.status || 200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleGetTrendingUsers = async (req, res) => {
  try {
    const result = await getTrendingUsers();
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleSearchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const result = await searchUsers(query);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

module.exports = {
  handleSearchUsername,
  handleSetUserProfile,
  handleGetUser,
  handleGetUserData,
  handleFollow,
  handleUnfollow,
  handleUpdateUserProfile,
  handleGetTrendingUsers,
  handleSearchUsers,
};
