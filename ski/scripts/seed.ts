import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path'; // Import path to fix folder issues
import News from '../models/News';
import { newsData } from '../data/seed-data';

// 1. Force the path to the root folder
const envPath = path.resolve(process.cwd(), '.env.local');

// 2. Load the config
const result = dotenv.config({ path: envPath });

// 3. Debugging: See if it actually worked
if (result.error) {
  console.error("⚠️ Error loading .env.local:", result.error);
} else {
  console.log("✅ Loaded env file from:", envPath);
  // This will print "undefined" if the key is missing in the file
  console.log("🔑 MONGODB_URI status:", process.env.MONGODB_URI ? "Found" : "Missing"); 
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to database...');
    // The "!" tells TypeScript we are sure MONGODB_URI is not undefined
    await mongoose.connect(MONGODB_URI!); 
    console.log('✅ Connected!');

    // Clear old data to avoid duplicates
    console.log('🧹 Clearing old data...');
    await News.deleteMany({});

    // Insert new data
    console.log('📦 Inserting new data...');
    await News.insertMany(newsData);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();