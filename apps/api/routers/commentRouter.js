const { Router } = require("express")
const commentRouter = Router()
const commentController = require("../controllers/commentController")
const authController = require("../controllers/authController")

commentRouter.get("/", commentController.fetchAllcomments)
commentRouter.post("/", authController.authenticateToken, commentController.createComment)
commentRouter.delete("/:cid", authController.authenticateToken, commentController.deleteComment)

module.exports = commentRouter;