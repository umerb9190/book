import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('bookstore');

  if (req.method === 'GET') {
    const { id } = req.query;
    const author = await db.collection('authors').findOne({ id: id });
    res.status(200).json(author);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
