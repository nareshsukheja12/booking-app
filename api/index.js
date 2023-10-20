import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from "cookie-parser"
import cors from "cors"


dotenv.config()
const app = express();
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected to MongoDB.")
    }catch(error){
        throw error
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected")
})

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/hotels", hotelsRoute)

//error handling middleware
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(6969,() => {
    connect()
    console.log("Connected to Backend.")
})