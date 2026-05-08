const express = require("express");
const {
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
} = require("../controllers/pollController");

const createPollRoutes = (io) => {
  const router = express.Router();

  router.post("/createpoll", handleCreatePoll(io));
  router.get("/getpolls", handleGetPolls);
  router.post("/poll", handleVotePoll(io));
  router.delete("/deletepoll", handleDeletePoll(io));
  router.get("/getpoll", handleGetPoll);
  router.get("/trendingPolls", handleGetTrendingPolls);
  router.get("/searchPolls", handleSearchPolls);
  router.post("/savePoll", handleSavePoll);
  router.post("/unsavePoll", handleUnsavePoll);
  router.get("/savedPolls", handleGetSavedPolls);
  router.post("/addComment", handleAddComment(io));
  router.get("/getComments", handleGetComments);
  router.delete("/deleteComment", handleDeleteComment(io));

  return router;
};

module.exports = createPollRoutes;
