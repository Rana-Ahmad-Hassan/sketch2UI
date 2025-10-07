import mongoose from "mongoose";

const MONGO_URL: any = process.env.MONGO_URL
export const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) return; // avoid reconnecting

    try {
        const connect = await mongoose.connect(MONGO_URL)
        if (connect) {
            console.log("Mongo DB is connected")
        }
    } catch (error: any) {
        throw new Error(error)
    }
}