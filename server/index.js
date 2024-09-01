import cors from "cors"; // to maintain security purpose
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";

dotenv.config();

//Default use
const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));

//Error handler
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

//call routes

app.use("/api/post", PostRouter)

// Default get
app.get("/",async(req,res)=>{
    res.status(200).json({
        message : "Hello Future Developers!"
    });
});

// Function to connect mongoDB to server
const connectDB = ()=>{
    mongoose.set("strictQuery", true);
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(()=> console.log("MongoDB Connected"))
        .catch((err)=>{
            console.error("Failed to connect MongoDB");
            console.error(err);
        });
};

//Function to Start the server
const startServer = async()=>{
    try {
        connectDB();
        app.listen(8080,()=> console.log("Server started on the port 8080"));
    } catch (error) {
        console.log(error);
    }
};

startServer();