const { Router } = require("express")
const commentRouter = Router()
const prisma = require("../../../prisma/client")

async function fetchAllcomments(req, res) {
    try {
        const postId = parseInt(req.params.id, 10)
        const comments = await prisma.comment.findMany({
            where: {
                id: postId,
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
        const postId = req.params.id
        const authorId = req.user.id
        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                authorId,
            }
        })
        if (!content || !postId || !authorId) return res.status(400).json({ error: "Content, postId and authorId are all required!" })
        res.json(comment)
    } catch(err) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

async function deleteComment(req, res) {
    try {
        const authorId = req.user.id
        const postId = req.params.id;
        const commentId = parseInt(req.params.cid, 10)
        const comment = await prisma.comment.findUnique({
            where: {
                postId,
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