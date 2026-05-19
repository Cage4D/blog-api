const { Router } = require("express")
const postRouter = Router()
const postController = require("../controllers/postController")
const authController = require("../controllers/authController")

postRouter.get("/", postController.displayAllPosts)
postRouter.get("/drafts",authController.authenticateToken, postController.fetchDrafts)
postRouter.get("/:id", postController.fetchPost)

//ADMIN PRIVILEDGES
postRouter.post("/", authController.authenticateToken, postController.createPost)
postRouter.put("/:id", authController.authenticateToken, postController.updatePost)
postRouter.delete("/:id", authController.authenticateToken, postController.deletePost)


module.exports = postRouter;