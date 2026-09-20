import mongoose from "mongoose";

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;

    try {
        await mongoose.connect(mongoURI);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error de conexión:", error);
    }
};

export default connectDB;
