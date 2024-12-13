import clientPromise from '@/lib/mongodb';

export const getAllGenres = async () => {
  const client = await clientPromise;
  const db = client.db('bookstore');
  return await db.collection('genres').find().toArray();
};

export const getBooksByGenre = async (genreId) => {
  const client = await clientPromise;
  const db = client.db('bookstore');
  return await db.collection('books').find({ genreId }).toArray();
};
