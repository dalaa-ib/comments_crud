import React, { useEffect, useState } from "react";
import CommentsList from "./components/commenstList/CommentsList";
import CommentForm from "./components/commentForm/CommentForm";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);
  async function addComment(newComment) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

      const data = await response.json();

      setComments((prev) => [data, ...prev]);
    } catch (error) {
      console.log(error);
    }
  } 

  async function deleteComment(id) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: "DELETE",
      });

      setComments((prev) =>
        prev.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  function editComment(comment) {
    setEditingComment(comment);
  }

  async function updateComment(updatedComment) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments/${updatedComment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedComment),
        }
      );

      const data = await response.json();

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === updatedComment.id ? data : comment
        )
      );

      setEditingComment(null);

    } catch (error) {
      console.log(error);
    }
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