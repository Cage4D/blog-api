const { Router } = require("express")
const indexRouter = Router()
const authController = require("../controllers/authController")

indexRouter.get("/", authController.authenticateToken, (req, res) => {
    res.redirect("/posts")
})
indexRouter.post("/", (req, res) => {})

module.exports = indexRouter;