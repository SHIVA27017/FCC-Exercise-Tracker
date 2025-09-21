import mongoose from "mongoose";

const ConnectToDB = async (startServer) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MonGoDB Connected: ${conn.connection.host}`);
    if (startServer) startServer();
  } catch (error) {
    console.log(`Error in connecting Mongodb.\n${error.message}`);
    process.exit(1);
  }
};

export default ConnectToDB;
