const prisma = require("../../../prisma/client")
const authController = require("./authController")

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

async function fetchDrafts(req, res) {
    try {
        const drafts = await prisma.post.findMany({
            where: {
                published: false,
                authorId: req.user.id,
            }
        })
        res.json(drafts)
    } catch(err) {
        res.status(500).json({ error: "Failed to fetch drafts" })
    }
}

module.exports = {
    displayAllPosts,
    fetchPost,
    fetchDrafts,
}