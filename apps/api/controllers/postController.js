const prisma = require("../../../prisma/client")

async function displayAllPosts(req, res) {
    try {
        const posts = await prisma.post.findMany()
        res.json(posts)
    } catch(err) {
        res.status(500).json({ error: "failed to fetch posts" })
    }
}

async function fetchPost(req, res) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: req.params.id }
        })
        if (!post) return res.status(500).json({ error: "post not found" })
        res.json(post)
    } catch(err) {
        res.status(500).json({ error: "Failed to fetch post" })
    }
}

module.exports = {
    displayAllPosts,
    fetchPost,
}