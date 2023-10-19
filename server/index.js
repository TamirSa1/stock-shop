import {productRouter} from "./products/route.js"
import {signUpRouter} from "./signUp/route.js"
import {loginRouter} from "./login/route.js"
import {cartRouter} from "./cart/route.js"
import express from "express"
import cors from "cors"
import path , { dirname }  from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// require and import not working together so in package.json write - "type": "module",
// const cors = require('cors')


const app = express();
app.use(express.json()); // עוזר לקרוא את הבאדי של הפוסט רקווסט
app.use(cors())
app.use("/api/products", productRouter)
app.use("/api/signup", signUpRouter)
app.use("/api/login", loginRouter)
app.use("/api/cart", cartRouter)

app.use(express.static(path.join(__dirname, './dist')));

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(4000, () => {
    console.log("server is running on 4000 port");
})