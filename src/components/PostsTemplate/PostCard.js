import React, { useState,useEffect } from "react";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
// import PostEngagement from "./PostEngagement";
import PostImage from "./PostImage";
import { db } from "../../firebase";
import firebase from "firebase";
import "./postStyles.css";

function PostCard(data) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (data.postId) {
      unsubscribe = db
        .collection("posts")
        .doc(data.postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [data.postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(data.postId).collection("comments").add({
      text: comment,
      username: data.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <article className="Post">
      <div>
        <PostHeader
          profileImg={data.profileImg}
          profileName={data.profileName}
        />
      </div>
      <div>
        <PostImage postImg={data.postImg} />
      </div>

      <div>
        <PostCaption profileName={data.profileName} caption={data.caption} />
      </div>
      
      <div className="post-comments">
        {comments.map((comment) => (
          <>
          <span>
            <span className="single-comment">{comment.username.replace(/ /g,'_').toLowerCase()}</span> {comment.text}
          </span>
          <br/>
          </>
        ))}
      </div>

      {localStorage.getItem('isLogged') && (
        <div className="post-commentsBox-div">
        <form className="post-commentsBox">
          <input
            className="post-input"
            type="text"
            placeholder="Add a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post-button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
        </div>
      )}
      
    </article>
  );
}

export default PostCard;
