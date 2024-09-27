import mongoose from 'mongoose';

const uri = process.env.MONGO_DB_URL;

if (!uri) {
  throw new Error("No MongoDB URL found");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToMongoDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, options).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    }).catch((error) => {
      console.log("MongoDB connection error:", error);
      throw error;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}
