import mongoose from 'mongoose'

const uri = process.env.MONGO_DB_URL;
export async function connectToMongoDB() {
    if (!uri) throw new Error("No MongoDB url");
    try {
       mongoose.connect(uri).then(()=> console.log("MongoDB connected succesfully"));
    }
    catch (error) {
        console.log("Error occured ", error);
        throw error;
    }
}