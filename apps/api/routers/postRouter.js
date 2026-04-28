const { Router } = require("express")
const postRouter = Router()

postRouter.get("/posts", (req, res) => {})
postRouter.get("/posts/:id", (req, res) => {})
postRouter.get("/posts/drafts", (req, res) => {})

//ADMIN PRIVILEDGES
postRouter.post("/posts", (req, res) => {})
postRouter.put("/posts/:id", (req, res) => {})
postRouter.delete("/posts/:id", (req, res) => {})


module.exports = postRouter;