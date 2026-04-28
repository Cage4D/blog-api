const { Router } = require("express")
const authRouter = Router()
const authController = require("../controllers/authController")

authRouter.post("/auth/signup", authController.signup)
authRouter.post("/auth/login", authController.login)
authRouter.post("/auth/logout", authController.logout)

module.exports = authRouter;