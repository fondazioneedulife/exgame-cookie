import mongoose from "mongoose";

if (!process.env.DB_CONNECTION) {
  throw new Error("Please configure database connection using env variable DB_CONNECTION (use .env files)");
}

mongoose.connect(process.env.DB_CONNECTION);

export default mongoose;
