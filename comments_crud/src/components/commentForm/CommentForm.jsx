import React, { useEffect, useState } from "react";
import "./commentform.css";

const CommentForm = ({ addComment, updateComment, editingComment }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: "",
    });

    useEffect(() => {
        if (editingComment) {
            setForm({
                name: editingComment.name,
                email: editingComment.email,
                body: editingComment.body,
            });
        }
    }, [editingComment]);
    function formChange(event) {
        const { name, value } = event.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    function formSubmit(event) {
        event.preventDefault();
        if (form.name.length === 0 && form.email.length === 0 && form.body.length === 0) {
            return;
        }
        if (editingComment) {
            updateComment({
                ...form,
                id: editingComment.id,
            });
        } else {
            addComment(form);
        }

        setForm({
            name: "",
            email: "",
            body: "",
        });
    }

    return (
        <div>
            <form className="formContainer" onSubmit={formSubmit}>
                <label>Name:</label>
                <input name="name" value={form.name} onChange={formChange} />

                <label>Email:</label>
                <input name="email" value={form.email} onChange={formChange} />

                <label>Comment:</label>
                <textarea name="body" value={form.body} onChange={formChange} />

                <button type="submit" className="submit">
                    {editingComment ? "Update Comment" : "Add Comment"}
                </button>
            </form>
        </div>
    );
};

export default CommentForm;