import React, { useEffect, useState } from "react";
import CommentsList from "./components/commenstList/CommentsList";
import CommentForm from "./components/commentForm/CommentForm";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  function addComment(newComment) {
    setComments((prev) => {
      const lastId = prev.length > 0 ? prev[prev.length - 1].id : 0;
      return [
        { ...newComment, id: lastId + 1 },
        ...prev,
      ];
    });
  }

  function deleteComment(id) {
    setComments((prev) =>
      prev.filter((comment) => comment.id !== id)
    );
  }

  function editComment(comment) {
    setEditingComment(comment);
  }

  function updateComment(updatedComment) {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === updatedComment.id ? updatedComment: comment
    ));
  }
  return (
    <div>
      <h1 className="commentsCrud">Comments Crud</h1>

      <CommentForm
        addComment={addComment}
        updateComment={updateComment}
        editingComment={editingComment}
      />

      <CommentsList
        comments={comments}
        deleteComment={deleteComment}
        editComment={editComment}
      />
    </div>
  );
}

export default App;