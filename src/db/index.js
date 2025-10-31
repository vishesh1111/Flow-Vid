import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


// when connecting to the database we use try catch block to handle errors
export const connectToDB = async () => {
    try{
        console.log(`\nAttempting MongoDB connection...`);
        console.log(`MongoDB URL: ${process.env.MONGODB_URL}`);
        console.log(`DB_NAME: ${DB_NAME}`);
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\nMongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MONGODB ConnectionError:", error.message);
        console.log("Full Error:", error);
        process.exit(1)
    }
}

export default connectToDB;