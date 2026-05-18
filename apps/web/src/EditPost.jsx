import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

function EditPost() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`/api/posts/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setTitle(data.title);
          setContent(data.content);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setFetching(false));
  }, [id]);

  const handleUpdate = async (published) => {
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, published }),
      });

      if (res.status === 401 || res.status === 403) {
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update post.");
        return;
      }

      navigate(published ? "/home" : "/drafts");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Edit Post</h1>
          <button
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => navigate("/home")}>
            ← Back
          </button>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-xl shadow space-y-5">

          {error && (
            <div className="px-4 py-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* TinyMCE Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "anchor", "autolink", "charmap", "codesample",
                  "emoticons", "image", "link", "lists", "media",
                  "searchreplace", "table", "visualblocks", "wordcount",
                ],
                toolbar:
                  "undo redo | blocks fontsize | bold italic underline strikethrough | " +
                  "link image media table | align lineheight | " +
                  "bullist numlist indent outdent | emoticons charmap | removeformat",
              }}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => handleUpdate(false)}
              disabled={loading}
              className="px-6 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Saving..." : "Move to Drafts"}
            </button>
            <button
              onClick={() => handleUpdate(true)}
              disabled={loading}
              className="px-6 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default EditPost;