const { Router } = require("express")
const postRouter = Router()
const postController = require("../controllers/postController")
const authController = require("../controllers/authController")

postRouter.get("/posts", postController.displayAllPosts)
postRouter.get("/posts/drafts", postController.fetchDrafts)
postRouter.get("/posts/:id", postController.fetchPost)

//ADMIN PRIVILEDGES
postRouter.post("/posts", authController.authenticateToken, postController.createPost)
postRouter.put("/posts/:id", authController.authenticateToken, postController.updatePost)
postRouter.delete("/posts/:id", authController.authenticateToken, postController.deletePost)


module.exports = postRouter;