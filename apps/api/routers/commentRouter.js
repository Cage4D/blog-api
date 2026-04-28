const { Router } = require("express")
const commentRouter = Router()

commentRouter.get("/posts/:id/comments", (req, res) => {})
commentRouter.post("/posts/:id/comments", (req, res) => {})
commentRouter.delete("/posts/:id/comments/:cid", (req, res) => {})

module.exports = commentRouter;