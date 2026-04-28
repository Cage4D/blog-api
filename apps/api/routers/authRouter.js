const { Router } = require("express")
const authRouter = Router()

authRouter.get("/auth/signup", (req, res) => {})
authRouter.post("/auth/login", (req, res) => {})
authRouter.post("/auth/logout", (req, res) => {})

module.exports = authRouter;