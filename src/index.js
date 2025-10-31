import dotenv from 'dotenv';
import path from 'path';
import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "./constants.js";
import connectToDB from "./db/index.js";

// Load environment variables. We resolve the .env path relative to the project root
// so running `npm run dev` from the repo root works regardless of where this file lives.
dotenv.config({ path: path.resolve(process.cwd(), 'public/temp/.env') });

const app = express();

// Basic middleware
app.use(express.json());

// Basic routes
app.get('/', (req, res) => {
    res.json({
        message: "🚀 Backend API is running successfully!",
        status: "Connected",
        port: process.env.PORT || 8000,
        database: DB_NAME
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// connect after dotenv has loaded
connectToDB()
.then(() => {
    // Start server only after successful DB connection
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚡️ Server is running at port: ${process.env.PORT || 8000}`);
    });
})
.catch((err) => {
    console.log("MongoDB connection failed! Server not started.", err);
});

/*
//IMMEDIATELY INVOKED FUNCTION EXPRESSION 
// using IIFE statement syntax Here:-
(async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    app.on("error", (error) => {
        console.error("ERROR", error)
        throw error;
    })
    app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`); 
    })  
    }
    catch (error) {
        console.error("ERROR", error)
        throw error;
    }
})();

*/