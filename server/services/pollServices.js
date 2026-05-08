const { options, polls } = require("../db/models/polls");
const users = require("../db/models/users");
const comments = require("../db/models/comments");

const transformPoll = (poll) => {
  const optionsWithVoteCount = (poll.options || []).map((option) => ({
    _id: option._id,
    text: option.text,
    voteCount: option.voters.length,
  }));
  return {
    pollId: poll._id,
    date: poll.date,
    question: poll.question,
    options: optionsWithVoteCount,
    creator: {
      _id: poll.creator._id,
      username: poll.creator.username,
      avatar: poll.creator.avatar,
    },
  };
};

const createPoll = async (question, optionsArray, email, date, io) => {
  if (!question || optionsArray.length === 0) {
    throw new Error("Invalid poll data");
  }

  const user = await users.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const pollOptions = await Promise.all(
    optionsArray.map(async (optionText) => {
      const option = new options({ text: optionText, voters: [] });
      await option.save();
      return option._id;
    })
  );

  const poll = new polls({
    question,
    options: pollOptions,
    creator: user._id,
    date,
  });
  await poll.save();

  user.pollsCreated.push(poll._id);
  await user.save();

  const savedPoll = await polls
    .findOne({ _id: poll._id })
    .populate({
      path: "options",
      select: "text voters _id",
      populate: { path: "voters", select: "_id" },
    })
    .populate("creator", "username avatar _id");

  const transformedPoll = transformPoll(savedPoll);
  io.emit("newPollCreated", transformedPoll);

  return { message: "Successfully uploaded poll" };
};

const checkVoted = async (poll, email) => {
  const user = await users.findOne({ email });
  if (!user) {
    throw new Error("Unable to find user");
  }
  const pollOptions = poll.options;
  let selectedIndex = -1;

  for (let i = 0; i < pollOptions.length; i++) {
    const option = await options.findOne({ _id: pollOptions[i] });
    if (option && option.voters.includes(user._id)) {
      selectedIndex = i;
      break;
    }
  }
  return selectedIndex;
};

const getPolls = async (email) => {
  let pollsArray = await polls
    .find()
    .sort({ date: -1 })
    .populate({
      path: "options",
      select: "text voters _id",
      populate: { path: "voters", select: "_id" },
    })
    .populate("creator", "username avatar _id");

  pollsArray = pollsArray.map(transformPoll);

  if (email) {
    pollsArray = await Promise.all(
      pollsArray.map(async (poll) => {
        const selectedIndex = await checkVoted(poll, email);
        if (selectedIndex !== -1) {
          return { ...poll, selectedIndex };
        }
        return poll;
      })
    );
  }

  return pollsArray;
};

const updatePoll = async (pollId, optionIndex, email, io) => {
  const user = await users.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const poll = await polls.findOne({ _id: pollId }).populate("options");
  if (!poll) {
    throw new Error("Poll not found");
  }

  if (!user.pollsVoted.includes(poll._id)) {
    user.pollsVoted.push(poll._id);
    await user.save();
  }

  for (let option of poll.options) {
    if (option.voters.includes(user._id)) {
      option.voters.pull(user._id);
      await option.save();
    }
  }

  const selectedOption = poll.options[optionIndex];
  selectedOption.voters.push(user._id);
  await selectedOption.save();

  const savedPoll = await polls
    .findOne({ _id: poll._id })
    .populate({
      path: "options",
      select: "text voters _id",
      populate: { path: "voters", select: "_id" },
    })
    .populate("creator", "username avatar _id");

  const transformedPoll = transformPoll(savedPoll);
  io.emit("pollUpdate", transformedPoll);

  return { message: "Successfully updated poll" };
};

const deletePoll = async (email, pollid, io) => {
  try {
    const user = await users.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const poll = await polls.findOne({ _id: pollid });
    if (!poll) {
      throw new Error("Poll not found");
    }

    if (poll.creator.toString() === user._id.toString()) {
      await polls.deleteOne({ _id: pollid });
      await options.deleteMany({ _id: { $in: poll.options } });
      await users.updateOne(
        { _id: user._id },
        { $pull: { pollsCreated: pollid } }
      );
      await users.updateMany(
        { pollsVoted: pollid },
        { $pull: { pollsVoted: pollid } }
      );

      io.emit("pollDelete", pollid);

      return { message: "Successfully deleted poll" };
    } else {
      throw new Error("User is not the creator of the poll");
    }
  } catch (error) {
    console.error("Error during poll deletion process:", error);
    throw error; // Re-throw the error if needed
  }
};

const getPoll = async (pollId, email) => {
  const poll = await polls
    .findOne({ _id: pollId })
    .populate({
      path: "options",
      select: "text voters _id",
      populate: { path: "voters", select: "_id" },
    })
    .populate("creator", "username avatar _id");

  const selectedIndex = await checkVoted(poll, email);
  if (selectedIndex !== -1) {
    return { ...transformPoll(poll), selectedIndex };
  }

  return transformPoll(poll);
};

const getTrendingPolls = async (email) => {
  let pollsArray = await polls
    .find()
    .populate({
      path: "options",
      select: "text voters _id",
      populate: { path: "voters", select: "_id" },
    })
    .populate("creator", "username avatar _id");

  // Transform and sort by total votes
  pollsArray = pollsArray.map(transformPoll).sort((a, b) => {
    const totalVotesA = a.options.reduce((acc, opt) => acc + opt.voteCount, 0);
    const totalVotesB = b.options.reduce((acc, opt) => acc + opt.voteCount, 0);
    return totalVotesB - totalVotesA;
  });

  if (email) {
    pollsArray = await Promise.all(
      pollsArray.map(async (poll) => {
        const selectedIndex = await checkVoted(poll, email);
        if (selectedIndex !== -1) {
          return { ...poll, selectedIndex };
        }
        return poll;
      })
    );
  }

  return pollsArray.slice(0, 10); // Return top 10
};

const searchPolls = async (query, email) => {
  let pollsArray = await polls
    .find({ question: { $regex: query, $options: "i" } })
    .populate({
      path: "options",
      select: "text voters _id",
      populate: { path: "voters", select: "_id" },
    })
    .populate("creator", "username avatar _id");

  pollsArray = pollsArray.map(transformPoll);

  if (email) {
    pollsArray = await Promise.all(
      pollsArray.map(async (poll) => {
        const selectedIndex = await checkVoted(poll, email);
        if (selectedIndex !== -1) {
          return { ...poll, selectedIndex };
        }
        return poll;
      })
    );
  }

  return pollsArray;
};

const savePoll = async (email, pollId) => {
  const user = await users.findOne({ email });
  if (!user) throw new Error("User not found");
  if (!user.savedPolls.includes(pollId)) {
    user.savedPolls.push(pollId);
    await user.save();
  }
  return { message: "Poll saved successfully" };
};

const unsavePoll = async (email, pollId) => {
  const user = await users.findOne({ email });
  if (!user) throw new Error("User not found");
  user.savedPolls = user.savedPolls.filter((id) => id.toString() !== pollId);
  await user.save();
  return { message: "Poll unsaved successfully" };
};

const getSavedPolls = async (email) => {
  const user = await users.findOne({ email }).populate({
    path: "savedPolls",
    populate: [
      {
        path: "options",
        select: "text voters _id",
        populate: { path: "voters", select: "_id" },
      },
      { path: "creator", select: "username avatar _id" },
    ],
  });
  if (!user) throw new Error("User not found");

  let pollsArray = user.savedPolls.map(transformPoll);
  pollsArray = await Promise.all(
    pollsArray.map(async (poll) => {
      const selectedIndex = await checkVoted(poll, email);
      if (selectedIndex !== -1) {
        return { ...poll, selectedIndex };
      }
      return poll;
    })
  );

  return pollsArray;
};

const addComment = async (email, pollId, text, parentId = null, io) => {
  const user = await users.findOne({ email });
  if (!user) throw new Error("User not found");

  const newComment = new comments({
    pollId,
    userId: user._id,
    text,
    parentId,
  });
  await newComment.save();

  const populatedComment = await comments
    .findById(newComment._id)
    .populate("userId", "username avatar");

  const transformedComment = {
    commentId: populatedComment._id,
    pollId: populatedComment.pollId,
    userId: populatedComment.userId._id,
    username: populatedComment.userId.username,
    avatar: populatedComment.userId.avatar,
    text: populatedComment.text,
    date: populatedComment.date,
    parentId: populatedComment.parentId,
  };

  io.emit("newComment", transformedComment);

  return { message: "Comment added successfully", comment: transformedComment };
};

const getComments = async (pollId) => {
  const pollComments = await comments
    .find({ pollId })
    .populate("userId", "username avatar")
    .sort({ date: -1 });

  return pollComments.map((comment) => ({
    commentId: comment._id,
    pollId: comment.pollId,
    userId: comment.userId._id,
    username: comment.userId.username,
    avatar: comment.userId.avatar,
    text: comment.text,
    date: comment.date,
    parentId: comment.parentId,
  }));
};

const deleteComment = async (email, commentId, io) => {
  const user = await users.findOne({ email });
  if (!user) throw new Error("User not found");

  const comment = await comments.findById(commentId).populate("pollId");
  if (!comment) throw new Error("Comment not found");

  // Allow delete if user is the comment author OR user is the poll creator
  const isAuthor = comment.userId.toString() === user._id.toString();
  const isPollCreator = comment.pollId.creator.toString() === user._id.toString();

  if (!isAuthor && !isPollCreator) {
    throw new Error("Unauthorized to delete this comment");
  }

  await comments.findByIdAndDelete(commentId);
  // Also delete replies
  await comments.deleteMany({ parentId: commentId });

  io.emit("commentDeleted", { commentId, pollId: comment.pollId._id });

  return { message: "Comment deleted successfully" };
};

module.exports = {
  createPoll,
  checkVoted,
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
};
