import dotenv from 'dotenv';
dotenv.config(); 

import app from './app';
import connectDB from './config/db'; 
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

startServer();
