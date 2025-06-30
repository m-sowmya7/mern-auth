import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI;
    
    await mongoose.connect(dbURI, {dbName: 'auth_db'});
    
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}