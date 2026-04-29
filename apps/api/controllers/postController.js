const prisma = require("../../../prisma/client")

async function displayAllPosts(req, res) {
    try {
        const posts = await prisma.post.findMany()
        res.json(posts)
    } catch(err) {
        res.status(500).json({ error: "failed to fetch posts" })
    }
}

module.exports = {
    displayAllPosts,
}