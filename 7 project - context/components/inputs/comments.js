import { useState, useEffect, useContext } from "react";
import NotificationContext from "../../store/notification-context";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchComments = async () => {
      const response = await fetch(`/api/comments/${eventId}`);
      const data = await response.json();
      setComments(data.comments);
    };
    fetchComments();
    setLoading(false);
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is being stored",
      status: "pending",
    });

    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      notificationCtx.showNotification({
        title: "Success",
        message: "Your comment was saved",
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading && <CommentList items={comments} />}
      {showComments && loading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
