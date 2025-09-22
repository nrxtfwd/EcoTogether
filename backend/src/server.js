import express from "express"
import projectRoutes from './routes/projectRoutes.js'
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB()

//middleware
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))
//app.use(rateLimiter)

// app.use((req,res,next) => {
//     console.log(req.url,req.method)
//     next()
// })

app.use("/api/projects", projectRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server started!", PORT)
})

//