import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "next-blog",
    });
    console.log("MongoDB is connected");
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connectDB;
