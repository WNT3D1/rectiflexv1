import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure you have a MongoDB URI in your .env file
let client: MongoClient;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
  return client.db('rectiflex'); // Specify the database name
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please fill all fields' });
    }

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection('users');

      // Check if the user already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      await usersCollection.insertOne({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
