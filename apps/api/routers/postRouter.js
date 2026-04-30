const { Router } = require("express")
const postRouter = Router()
const postController = require("../controllers/postController")

postRouter.get("/posts", postController.displayAllPosts)
postRouter.get("/posts/drafts", (req, res) => {})
postRouter.get("/posts/:id", postController.fetchPost)

//ADMIN PRIVILEDGES
postRouter.post("/posts", (req, res) => {})
postRouter.put("/posts/:id", (req, res) => {})
postRouter.delete("/posts/:id", (req, res) => {})


module.exports = postRouter;