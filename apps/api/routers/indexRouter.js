const { Router } = require("express")
const indexRouter = Router()

indexRouter.get("/", (req, res) => {
    res.redirect("/posts")
})
indexRouter.post("/", (req, res) => {})

module.exports = indexRouter;