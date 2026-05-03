const { Router } = require("express")
const commentRouter = Router()
const commentController = require("../controllers/commentController")
const authController = require("../controllers/authController")

commentRouter.get("/posts/:id/comments", commentController.fetchAllcomments)
commentRouter.post("/posts/:id/comments", authController.authenticateToken, commentController.createComment)
commentRouter.delete("/posts/:id/comments/:cid", authController.authenticateToken, commentController.deleteComment)

module.exports = commentRouter;