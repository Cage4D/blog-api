const express = require("express")
const indexRouter = require("./routers/indexRouter")
const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: false }))
app.use("/", indexRouter)

app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})