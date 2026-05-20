import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Home() {
  const [posts, setPosts] = React.useState([]);
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
        setPosts((prev) => prev.filter((p) => p.id !== postId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded.id);
    }

    fetch("/api/posts", {
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
      .then((data) => data && setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">
            My Dashboard
          </h1>

          <div className="flex gap-3">
            <button
              className="px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
              onClick={() => navigate("/drafts")}>
              Drafts
            </button>

            <button
              className="px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
              onClick={() => navigate("/create-post")}>
              + Create Post
            </button>

            <button
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Latest Posts
        </h2>

        {posts.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            No posts available
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/posts/${post.id}`)}>

                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {post.title}
                  </h3>

                  {currentUserId === post.authorId && (
                    <div className="flex gap-2 ml-4 shrink-0">
                      <button
                        className="px-3 py-1 text-xs text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/edit-post/${post.id}`);
                        }}>
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 text-xs text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post.id);
                        }}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className="text-gray-600 mt-2 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;