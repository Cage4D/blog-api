import React from "react";

function Home() {
    const [posts, setPosts] = React.useState([])
    React.useEffect(() => {
        fetch("/")
        .then((res) => res.json())
        .then(data => setPosts(data))
    }, [])

    return (
        <div>
            <h1>Home</h1>

            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Home;