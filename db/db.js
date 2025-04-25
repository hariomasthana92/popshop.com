import mongoose from "mongoose";
const connectDB = async () => {
    console.log("MongoDB URI:", process.env.DB_CONNECT);
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECT);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    };

export default connectDB;