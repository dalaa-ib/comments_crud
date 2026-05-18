const BASE_URL = "https://jsonplaceholder.typicode.com/comments";

export async function getComments() {
    const response = await fetch(BASE_URL);
    return response.json();
}


export async function addCommentApi(comment) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });

    return response.json();
}

export async function deleteCommentApi(id) {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    return id;
}
export async function updateCommentApi(comment) {
    const response = await fetch(`${BASE_URL}/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });

    return response.json();
}