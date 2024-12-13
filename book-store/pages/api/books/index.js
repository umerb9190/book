import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('bookstore');

  if (req.method === 'GET') {
    const books = await db.collection('books').find({}).toArray();
    res.status(200).json(books);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
