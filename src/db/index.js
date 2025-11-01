import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


// when connecting to the database we everytime use try catch block to handle errors & the async await method 
export const connectToDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables");
        }
        
        console.log(`\nAttempting MongoDB connection...`);
        // Only log part of the URL to avoid exposing credentials
        const sanitizedUrl = process.env.MONGODB_URL.replace(/:\/\/(.*@)?/, '://***:***@');
        console.log(`MongoDB URL: ${sanitizedUrl}`);
        console.log(`DB_NAME: ${DB_NAME}`);
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`\nMongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch(error) {
        console.error("MONGODB Connection Error:", error.message);
        if (error.name === 'MongoParseError') {
            console.error("Invalid MongoDB connection string format");
        } else if (error.name === 'MongoNetworkError') {
            console.error("Could not connect to MongoDB. Please check if MongoDB is running and accessible");
        }
        process.exit(1)
    }
}

export default connectToDB;