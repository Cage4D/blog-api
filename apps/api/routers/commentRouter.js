const { Router } = require("express")
const commentRouter = Router()
const commentController = require("../controllers/commentController")

commentRouter.get("/posts/:id/comments", commentController.fetchAllcomments)
commentRouter.post("/posts/:id/comments", (req, res) => {})
commentRouter.delete("/posts/:id/comments/:cid", (req, res) => {})

module.exports = commentRouter;