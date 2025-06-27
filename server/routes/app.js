import express from 'express'
import { config } from 'dotenv'
import userRoutes from './userRoutes.js'
import cookieParser from 'cookie-parser'
import verifyRoutes from './verifyRoutes.js'
import cors from 'cors'
const app = express()
config()

app.use(cors({
    origin: process.env.VITE_CLIENT_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use("/users", userRoutes)
app.use("/auth", verifyRoutes)
app.get("/", (req, res) => {
    res.send("Hello Multer")
})


export default app