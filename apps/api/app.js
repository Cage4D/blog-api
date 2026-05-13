const express = require("express")
const indexRouter = require("./routers/indexRouter")
const postRouter = require("./routers/postRouter")
const commentRouter = require("./routers/commentRouter")
const authRouter = require("./routers/authRouter")
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", indexRouter)
app.use("/auth", authRouter)
app.use("/posts/:id/comments", commentRouter)
app.use("/posts", postRouter)

app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})