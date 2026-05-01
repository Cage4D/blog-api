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

async function createPost(req, res) {
    try {
        const { title, content } = req.body
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: req.user.id
            }
        })
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" })
        }
        res.status(201).json(post)
    } catch(err) {
        res.status(500).json({ error: "Couldn't create post" })
    }
}

module.exports = {
    displayAllPosts,
    fetchPost,
    fetchDrafts,
    createPost
}