import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = React.useState([]);
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  React.useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("/api/", {
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

          <button 
          className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          onClick={handleLogout}>
            Logout
          </button>
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
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;