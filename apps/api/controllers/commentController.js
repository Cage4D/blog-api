const { prisma } = require("../lib/prisma")

async function fetchAllcomments(req, res) {
    try {
        const postId = parseInt(req.params.id, 10)
        const comments = await prisma.comment.findMany({
            where: {
                postId: postId,
            },
            include: {
                author: true
            }
        })
        res.json(comments)
    } catch(err) {
        res.status(500).json({ error: "Failed to fetch comments" })
    }
}

async function createComment(req, res) {
    try {
        const { content } = req.body
        const postId = parseInt(req.params.id, 10)
        const authorId = req.user.id

        if (!content || !postId || !authorId) return res.status(400).json({ error: "Content, postId and authorId are all required!" })

        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                authorId,
            }
        })
        res.json(comment)
    } catch(err) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

async function deleteComment(req, res) {
    try {
        const authorId = req.user.id
        const postId = parseInt(req.params.id, 10)
        const commentId = parseInt(req.params.cid, 10)
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId
            }
        })
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" })
        }
        if (comment.authorId !== authorId) return res.status(403).json({ error: "Not authorized to delete this comment" })
        await prisma.comment.delete({
            where: {
                id: commentId
            }
        })
        res.json({ message: "Comment deleted successfully" })
    } catch(err) {
        res.status(500).json({ error: "Couldn't delete comment" })
    }
}

module.exports = {
    fetchAllcomments,
    createComment,
    deleteComment
}