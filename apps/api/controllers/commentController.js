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

module.exports = {
    fetchAllcomments,
}