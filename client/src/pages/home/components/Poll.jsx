import React, { useState, useEffect, useCallback } from "react";
import styles from "../css/poll.module.css";
import { poll, savePoll, unsavePoll, getComments, addComment, deleteComment } from "../../../api";
import comment from "../../../assets/images/comment.svg";
import saveIcon from "../../../assets/images/save.svg";
import saveFilled from "../../../assets/images/saveFilled.svg";
import more from "../../../assets/images/moreVertical.svg";
import trash from "../../../assets/images/trash.svg";
import avatars from "../../../assets/avatars";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../components/SocketProvider";

const Poll = ({
  pollId,
  creator,
  question,
  options,
  avatar,
  selected,
  uploadDate,
  saved = false,
  initiallyShowComments = false,
}) => {
  const [selectedOption, setSelectedOption] = useState(selected);
  const [initialSelectionSet, setInitialSelectionSet] = useState(false);
  const [isSaved, setIsSaved] = useState(saved);
  const [showComments, setShowComments] = useState(initiallyShowComments);
  const [commentsList, setCommentsList] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const socket = useSocket();
  const navigate = useNavigate();

  const currentUserEmail = localStorage.getItem("email");

  const fetchComments = useCallback(async () => {
    setLoadingComments(true);
    const res = await getComments(pollId);
    if (res && res.ok) {
      const data = await res.json();
      setCommentsList(data);
    }
    setLoadingComments(false);
  }, [pollId]);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, fetchComments]);

  useEffect(() => {
    if (!socket) return;

    const handleNewComment = (comment) => {
      if (comment.pollId === pollId) {
        setCommentsList((prev) => [comment, ...prev]);
      }
    };

    const handleCommentDeleted = ({ commentId, pollId: deletedPollId }) => {
      if (deletedPollId === pollId) {
        setCommentsList((prev) => prev.filter((c) => c.commentId !== commentId));
      }
    };

    socket.on("newComment", handleNewComment);
    socket.on("commentDeleted", handleCommentDeleted);

    return () => {
      socket.off("newComment", handleNewComment);
      socket.off("commentDeleted", handleCommentDeleted);
    };
  }, [socket, pollId]);

  const handleSave = async (e) => {
    e.stopPropagation();
    if (isSaved) {
      await unsavePoll(pollId);
      setIsSaved(false);
    } else {
      await savePoll(pollId);
      setIsSaved(true);
    }
  };

  const handleCommentToggle = (e) => {
    e.stopPropagation();
    setShowComments(!showComments);
  };

  const handlePostComment = async (parentId = null) => {
    const text = parentId ? replyTo.text : newComment;
    if (!text.trim()) return;

    const res = await addComment(pollId, text, parentId);
    if (res && res.ok) {
      if (parentId) {
        setReplyTo(null);
      } else {
        setNewComment("");
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
  };

  useEffect(() => {
    if (!initialSelectionSet) {
      setSelectedOption(selected);
      setInitialSelectionSet(true);
    }
  }, [selected, initialSelectionSet]);

  useEffect(() => {
    const vote = async () => {
      if (selectedOption !== null && initialSelectionSet) {
        let email = localStorage.getItem("email");
        await poll(pollId, selectedOption, email);
      }
    };
    vote();
  }, [selectedOption, initialSelectionSet, pollId]);

  const handleNavigate = () => {
    navigate(`/profile/${creator}`);
  };

  const totalVotes = (options || []).reduce(
    (total, option) => total + (option.voteCount || 0),
    0
  );

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const formatTimeDifference = (date) => {
    const now = new Date();
    const upload = new Date(date);
    let diffInSeconds = Math.floor((now - upload) / 1000);
    if (diffInSeconds < 0) diffInSeconds = 0;
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;

    if (diffInSeconds < secondsInMinute) return `${diffInSeconds} s ago`;
    if (diffInSeconds < secondsInHour) return `${Math.floor(diffInSeconds / secondsInMinute)} mins ago`;
    if (diffInSeconds < secondsInDay) return `${Math.floor(diffInSeconds / secondsInHour)} hours ago`;
    return `${Math.floor(diffInSeconds / secondsInDay)} days ago`;
  };

  const handleUserNavigate = (username) => {
    navigate(`/profile/${username}`);
  };

  const renderComment = (comment, isReply = false) => {
    const isAuthor = comment.username === localStorage.getItem("username");
    const isPollOwner = creator === localStorage.getItem("username");

    return (
      <div key={comment.commentId} className={isReply ? styles.replyItem : styles.commentItem}>
        <img
          src={avatars[comment.avatar]}
          alt="avatar"
          className={styles.commentAvatar}
          onClick={() => handleUserNavigate(comment.username)}
        />
        <div className={styles.commentContent}>
          <div className={styles.commentHeader}>
            <span
              className={styles.commentUser}
              onClick={() => handleUserNavigate(comment.username)}
            >
              {comment.username}
            </span>
            {(isAuthor || isPollOwner) && (
              <img
                src={trash}
                alt="delete"
                className={styles.deleteIcon}
                onClick={() => handleDeleteComment(comment.commentId)}
              />
            )}
          </div>
          <p className={styles.commentText}>{comment.text}</p>
          <div className={styles.commentActions}>
            <span className={styles.uploadDate}>{formatTimeDifference(comment.date)}</span>
            {!isReply && (
              <button
                className={styles.actionButton}
                onClick={() => setReplyTo({ id: comment.commentId, username: comment.username, text: "" })}
              >
                Reply
              </button>
            )}
          </div>
          
          {replyTo?.id === comment.commentId && (
            <div className={styles.replyInputContainer}>
              <div className={styles.commentInputContainer}>
                <input
                  type="text"
                  placeholder={`Reply to @${comment.username}...`}
                  className={styles.commentInput}
                  value={replyTo.text}
                  onChange={(e) => setReplyTo({ ...replyTo, text: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handlePostComment(comment.commentId)}
                />
                <button className={styles.sendButton} onClick={() => handlePostComment(comment.commentId)}>
                  Reply
                </button>
              </div>
            </div>
          )}

          {!isReply && (
            <div className={styles.repliesContainer}>
              {commentsList
                .filter((reply) => reply.parentId === comment.commentId)
                .map((reply) => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.pollContainer}>
      <div className={styles.header}>
        <div className={styles.userInfo} onClick={handleNavigate}>
          <img src={avatars[avatar]} alt="profile" className={styles.profile} />
          <div className={styles.subContainer}>
            <p className={styles.creator}>{creator}</p>
            <p className={styles.uploadDate}>{formatTimeDifference(uploadDate)}</p>
          </div>
        </div>
        <p className={styles.voteCount}>{totalVotes} votes</p>
      </div>
      <div className={styles.question}>{question}</div>
      <ul className={styles.options}>
        {options.map((option, index) => {
          const percentage = totalVotes === 0 ? 0 : Math.round((option.voteCount / totalVotes) * 100);
          return (
            <li
              key={index}
              className={`${styles.option} ${selectedOption === index ? styles.selected : ""}`}
              onClick={() => handleOptionClick(index)}
            >
              <div className={styles.optionText}>{option.text}</div>
              <div className={styles.optionVotes}>{percentage}%</div>
            </li>
          );
        })}
      </ul>
      <section className={styles.pollUserFunctions}>
        <div>
          <img src={comment} alt="comment" className={styles.icon} onClick={handleCommentToggle} />
          <img
            src={isSaved ? saveFilled : saveIcon}
            alt="save"
            className={styles.icon}
            onClick={handleSave}
            style={{
              filter: isSaved
                ? "invert(54%) sepia(95%) saturate(3025%) hue-rotate(188deg) brightness(103%) contrast(101%)"
                : "none",
            }}
          />
        </div>
        <img src={more} alt="more" className={styles.icon} />
      </section>

      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.commentInputContainer}>
            <input
              type="text"
              placeholder="Add a comment..."
              className={styles.commentInput}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
            />
            <button className={styles.sendButton} onClick={() => handlePostComment()}>
              Post
            </button>
          </div>
          {loadingComments ? (
            <p className={styles.uploadDate} style={{ textAlign: "center", margin: "10px 0" }}>
              Loading comments...
            </p>
          ) : (
            <div className={styles.commentList}>
              {commentsList
                .filter((c) => !c.parentId)
                .map((c) => renderComment(c))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Poll;
