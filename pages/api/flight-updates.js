// pages/api/flight-updates.js
import { MongoClient } from 'mongodb';

// Cache the MongoDB connection to reuse in serverless functions
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db('testflight'); // Replace with your desired database name
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect using the environment variable for your MongoDB connection string
      const { db } = await connectToDatabase(process.env.MONGO_URI);
      const flightData = req.body;

      // Insert the flight update data into the 'updates' collection
      await db.collection('updates').insertOne(flightData);

      res.status(200).json({ message: 'Flight update received' });
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ error: 'Error processing flight update' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
