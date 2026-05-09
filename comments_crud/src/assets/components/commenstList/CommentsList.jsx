import React from "react";
import "./commentsList.css";

const CommentsList = ({ comments, deleteComment, editComment }) => {
    return (
        <div className="comments-container">
            {comments.map((comment) => (
                <div className="comment-card" key={comment.id}>
                    <h4>{comment.name}</h4>
                    <p className="email">{comment.email}</p>
                    <p className="body">{comment.body}</p>

                    <div className="actions">
                        <button className="editBtn" onClick={() => editComment(comment)}>
                            Edit
                        </button>
                        <button className="deleteBtn" onClick={() => deleteComment(comment.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentsList;