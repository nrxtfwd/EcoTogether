import express from "express"
import projectRoutes from './routes/projectRoutes.js'
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
import path from "path"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

connectDB()

//middleware
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}

app.use(express.json())
//app.use(rateLimiter)

// app.use((req,res,next) => {
//     console.log(req.url,req.method)
//     next()
// })

app.use("/api/projects", projectRoutes)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist","index.html"))
    })
}

app.listen(process.env.PORT, () => {
    console.log("Server started!", PORT)
})

//