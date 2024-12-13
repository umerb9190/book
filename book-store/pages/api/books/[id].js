import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('bookstore');

  if (req.method === 'GET') {
    const { id } = req.query;
    const book = await db.collection('books').findOne({ id: id });
    res.status(200).json(book);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
