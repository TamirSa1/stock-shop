import {productRouter} from "./products/route.js"
import {signUpRouter} from "./signUp/route.js"
import {loginRouter} from "./login/route.js"
import express from "express"
import cors from "cors"

// require and import not working together so in package.json write - "type": "module",
// const cors = require('cors')


const app = express();
app.use(express.json()); // עוזר לקרוא את הבאדי של הפוסט רקווסט
app.use(cors())
app.use("/products", productRouter)
app.use("/signup", signUpRouter)
app.use("/login", loginRouter)

app.use(express.static("../client_React/dist"))

app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "./index.html"))
})

app.listen(4000, () => {
    console.log("server is running on 4000 port");
})