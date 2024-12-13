import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('Book-Store');
  
    if (req.method === 'GET') {
      const { id } = req.query;
      try {
        const books = await db.collection('books').find({ genreId: id }).toArray();
        console.log('Books fetched:', books); // Log the fetched books
        res.status(200).json(books);
      } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
