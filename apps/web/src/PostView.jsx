import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PostView() {
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded.id);
    }

    const fetchPost = fetch(`/api/posts/${id}`, {
      headers: { "Authorization": `Bearer ${token}` },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        navigate("/login");
        return;
      }
      return res.json();
    });

    const fetchComments = fetch(`/api/posts/${id}/comments`, {
      headers: { "Authorization": `Bearer ${token}` },
    }).then((res) => res.json());

    Promise.all([fetchPost, fetchComments])
      .then(([postData, commentsData]) => {
        if (postData) setPost(postData);
        if (commentsData) setComments(commentsData);
      })
      .catch((err) => console.error(err))
      .finally(() => setFetching(false));
  }, [id]);

  const handleAddComment = async () => {
    setError("");
    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to post comment.");
        return;
      }

      const comment = await res.json();
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/posts/${id}/comments/${commentId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Post</h1>
          <button
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => navigate("/home")}>
            ← Back
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Post */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
          <div
            className="text-gray-600 mt-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Comments */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Comments {comments.length > 0 && `(${comments.length})`}
          </h3>

          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex justify-between items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      {comment.author?.username || "Anonymous"}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">{comment.content}</p>
                  </div>

                  {currentUserId === comment.authorId && (
                    <button
                      className="px-3 py-1 text-xs text-red-600 border border-red-300 rounded-lg hover:bg-red-50 shrink-0 ml-4"
                      onClick={() => handleDeleteComment(comment.id)}>
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddComment}
                className="px-5 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Post Comment
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default PostView;