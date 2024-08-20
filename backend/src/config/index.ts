import { config } from 'dotenv';
import mongoose from 'mongoose';

config(); // Load environment variables from .env file

mongoose.set('strictQuery', false); // Disable strict query mode to avoid deprecation warnings

let isConnected = false; // Variable to track the connection status

/**
 * Connect to MongoDB with retry logic.
 *
 * This function attempts to establish a connection to MongoDB using the connection string provided
 * in the environment variable `MONGO_URI`. If the connection fails, it will retry up to the specified
 * number of attempts (`retries`), with a delay between each attempt.
 */
const connectDB = async (retries = 5, delay = 5000): Promise<void> => {
    if (process.env.NODE_ENV === 'test') {
        return; // Skip database connection in test environment
    }

    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    for (let i = 0; i < retries; i++) {
        try {
            await mongoose.connect(process.env.MONGO_URI || '', {});
            isConnected = true; // Set connection status to true
            console.log('MongoDB Connected');
            return;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`MongoDB connection failed (attempt ${i + 1}/${retries}):`, error.message);
            } else {
                console.error(`An unknown error occurred during MongoDB connection (attempt ${i + 1}/${retries}).`);
            }

            // If retries are still available, wait before retrying
            if (i < retries - 1) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise(res => setTimeout(res, delay));
            } else {
                console.error('All retries failed. Exiting...');
                if (process.env.NODE_ENV !== 'test') {
                    process.exit(1); // Exit the process with failure status in non-test environments
                } else {
                    throw new Error('MongoDB connection failed after multiple retries');
                }
            }
        }
    }
};

export default connectDB;
