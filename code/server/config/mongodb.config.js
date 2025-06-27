import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("MongoDB Connected Successfully !"))
        .catch((err)=> console.log("Error :",err))
}

export default connectDB