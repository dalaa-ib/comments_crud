import React, { useEffect, useState } from "react";
import CommentsList from "./components/commenstList/CommentsList";
import CommentForm from "./components/commentForm/CommentForm";

import {getComments, addCommentApi, deleteCommentApi, updateCommentApi,} from "./components/Api/Api";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  useEffect(() => {
    loadComments();
  }, []);
  
  async function loadComments() {
    const data = await getComments();
    setComments(data);
  }

  async function addComment(comment) {
    const data = await addCommentApi(comment);

    setComments((prev) => [data, ...prev]);
  }

  async function deleteComment(id) {
    await deleteCommentApi(id);

    setComments((prev) =>
      prev.filter((comment) => comment.id !== id)
    );
  }

  function editComment(comment) {
    setEditingComment(comment);
  }

  async function updateComment(comment) {
    const updated = await updateCommentApi(comment);

    setComments((prev) =>
      prev.map((item) =>
        item.id === updated.id ? updated : item
      )
    );

    setEditingComment(null);
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