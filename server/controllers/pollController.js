const {
  createPoll,
  getPolls,
  updatePoll,
  deletePoll,
  getPoll,
  getTrendingPolls,
  searchPolls,
  savePoll,
  unsavePoll,
  getSavedPolls,
  addComment,
  getComments,
  deleteComment,
} = require("../services/pollServices");
const { sendErrorResponse } = require("../utils/responseUtils");

const handleCreatePoll = (io) => async (req, res) => {
  const { question, optionsArray, email, date } = req.body;
  try {
    const result = await createPoll(question, optionsArray, email, date, io);
    return res.status(201).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleGetPolls = async (req, res) => {
  const { email } = req.query;
  try {
    const result = await getPolls(email);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleVotePoll = (io) => async (req, res) => {
  const { pollId, optionIndex, email } = req.body;
  try {
    const result = await updatePoll(pollId, optionIndex, email, io);
    return res.status(205).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleDeletePoll = (io) => async (req, res) => {
  const { email, pollid } = req.query;
  try {
    const result = await deletePoll(email, pollid, io);
    return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    sendErrorResponse(res, 400, e.message);
  }
};

const handleGetPoll = async (req, res) => {
  const { email, pollId } = req.query;
  try {
    const result = await getPoll(pollId, email);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleGetTrendingPolls = async (req, res) => {
  const { email } = req.query;
  try {
    const result = await getTrendingPolls(email);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleSearchPolls = async (req, res) => {
  const { query, email } = req.query;
  try {
    const result = await searchPolls(query, email);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleSavePoll = async (req, res) => {
  const { email, pollId } = req.body;
  try {
    const result = await savePoll(email, pollId);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleUnsavePoll = async (req, res) => {
  const { email, pollId } = req.body;
  try {
    const result = await unsavePoll(email, pollId);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleGetSavedPolls = async (req, res) => {
  const { email } = req.query;
  try {
    const result = await getSavedPolls(email);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleAddComment = (io) => async (req, res) => {
  const { email, pollId, text, parentId } = req.body;
  try {
    const result = await addComment(email, pollId, text, parentId, io);
    return res.status(201).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleGetComments = async (req, res) => {
  const { pollId } = req.query;
  try {
    const result = await getComments(pollId);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

const handleDeleteComment = (io) => async (req, res) => {
  const { email, commentId } = req.query;
  try {
    const result = await deleteComment(email, commentId, io);
    return res.status(200).send(result);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

module.exports = {
  handleCreatePoll,
  handleGetPolls,
  handleVotePoll,
  handleDeletePoll,
  handleGetPoll,
  handleGetTrendingPolls,
  handleSearchPolls,
  handleSavePoll,
  handleUnsavePoll,
  handleGetSavedPolls,
  handleAddComment,
  handleGetComments,
  handleDeleteComment,
};
