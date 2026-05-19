import React from "react";
import { useNavigate } from "react-router-dom";

function Drafts() {
  const [drafts, setDrafts] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/posts/drafts", {
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
      .then((data) => data && setDrafts(data))
      .catch((err) => console.error(err));
  }, []);

  const handlePublish = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ published: true }),
      });
      if (res.ok) {
        setDrafts((prev) => prev.filter((p) => p.id !== postId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setDrafts((prev) => prev.filter((p) => p.id !== postId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Drafts</h1>
          <button
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => navigate("/home")}>
            ← Back
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Your Drafts
        </h2>

        {drafts.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            No drafts yet
          </div>
        ) : (
          <div className="grid gap-4">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {draft.title}
                  </h3>

                  <div className="flex gap-2 ml-4 shrink-0">
                    <button
                      className="px-3 py-1 text-xs text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50"
                      onClick={() => navigate(`/edit-post/${draft.id}`)}>
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-xs text-green-600 border border-green-300 rounded-lg hover:bg-green-50"
                      onClick={() => handlePublish(draft.id)}>
                      Publish
                    </button>
                    <button
                      className="px-3 py-1 text-xs text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                      onClick={() => handleDelete(draft.id)}>
                      Delete
                    </button>
                  </div>
                </div>

                <div
                  className="text-gray-600 mt-2 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: draft.content }}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Drafts;