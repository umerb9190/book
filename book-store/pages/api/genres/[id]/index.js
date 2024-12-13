import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise; 
    const db = client.db('Book-Store');

    if (req.method === 'GET') {
        const { id } = req.query;
        const genre = await db.collection('genres').findOne({ id: id });
        res.status(200).json(genre);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}