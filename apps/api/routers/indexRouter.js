const { Router } = require("express")
const indexRouter = Router()

indexRouter.get("/", (req, res) => {
    res.send("listening on port 3000")
})
indexRouter.post("/", (req, res) => {})

module.exports = indexRouter;