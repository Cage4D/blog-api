const { prisma } = require("../lib/prisma")
const authController = require("./authController")

async function displayAllPosts(req, res) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true
            }
        })
        res.json(posts)
    } catch(err) {
        res.status(500).json({ error: "failed to fetch posts" })
    }
}

async function fetchPost(req, res) {
    try {
        const postId = parseInt(req.params.id, 10)
        const post = await prisma.post.findUnique({
            where: { id: postId }
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
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" })
        }
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: req.user.id,
                published: true,
            }
        })
        res.status(201).json(post)
    } catch(err) {
        res.status(500).json({ error: "Couldn't create post" })
    }
}

async function updatePost(req, res) {
    try {
        const { title, content } = req.body
        const postId = parseInt(req.params.id, 10)
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })
        if (!post) return res.status(404).json({ error: "Post not found" })
        if (req.user.id !== post.authorId) return res.status(403).json({ error: "Forbidden" });
        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title,
                content
            }
        })
        res.status(200).json(updatedPost)
    } catch(err) {
        res.status(500).json({ error: "Couldn't update post" })
    }
}

async function deletePost(req, res) {
    try {
            const postId = parseInt(req.params.id, 10)
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                }
            })
            if (!post) return res.status(404).json({ error: "Post not found"})
            if (req.user.id !== post.authorId) return res.status(403).json({ error: "Forbidden" })
            await prisma.post.delete({
            where: {
                id: postId
            }
            })
            res.status(200).json({ message: "Post deleted successfully"})
    } catch(err) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

module.exports = {
    displayAllPosts,
    fetchPost,
    fetchDrafts,
    createPost,
    updatePost,
    deletePost
}