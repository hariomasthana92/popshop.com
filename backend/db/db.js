import mongoose, { connect } from "mongoose";

const connectDB = async () => {
    console.log("MongoDB URI :", "mongodb://localhost:27017" );
    try
    {
        const conn = await mongoose.connect(process.env.DB_CONNECT || "mongodb://localhost:27017");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error)
    {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    };

export default connectDB;