const { Router } = require("express")
const commentRouter = Router()
const prisma = require("../../../prisma/client")

async function fetchAllcomments(req, res) {
    try {
        const comments = await prisma.comment.findMany()
        res.json(comments)
    } catch(err) {
        res.status(500).json({ error: "Failed to fetch comments" })
    }
}

module.exports = {
    fetchAllcomments,
}