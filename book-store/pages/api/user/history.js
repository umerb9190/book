import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('bookstore');
  const collection = db.collection('history');

  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    try {
      const history = await collection
        .find({ userId })
        .toArray();

      return res.status(200).json({ history });
    } catch (error) {
      console.error('Error fetching history:', error);
      return res.status(500).json({ error: 'Failed to fetch search history' });
    }
  } else if (req.method === 'POST') {
    const { userId, query } = req.body;

    if (!userId || !query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid userId or query provided' });
    }

    try {
      await collection.insertOne({ userId, query, createdAt: new Date() });
      return res.status(201).json({ message: 'Query saved successfully' });
    } catch (error) {
      console.error('Error saving search query:', error);
      return res.status(500).json({ error: 'Failed to save search query' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
