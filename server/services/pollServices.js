const { options, polls } = require("../db/models/polls");
const users = require("../db/models/users");

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

module.exports = {
  createPoll,
  checkVoted,
  getPolls,
  updatePoll,
  deletePoll,
  getPoll,
};
