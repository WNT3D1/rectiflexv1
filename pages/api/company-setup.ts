import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await client.connect();
            const database = client.db('mydatabase');
            const companyCollection = database.collection('companySettings');

            const { companyName, address, contactEmail, defaultClassification, logoUrl } = req.body;

            const result = await companyCollection.updateOne(
                {},
                { $set: { companyName, address, contactEmail, defaultClassification, logoUrl } },
                { upsert: true }  // Insert if doesn't exist
            );

            res.status(200).json({ message: 'Company settings saved successfully!' });
        } catch (error) {
            console.error('Error saving company settings:', error);
            res.status(500).json({ message: 'Error saving company settings.' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default handler;
