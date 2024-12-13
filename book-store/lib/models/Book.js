import clientPromise from '@/lib/mongodb';

export const getAllBooks = async () => {
  const client = await clientPromise;
  const db = client.db('bookstore');
  return await db.collection('books').find().toArray();
};

export const getBookById = async (id) => {
  const client = await clientPromise;
  const db = client.db('bookstore');
  return await db.collection('books').findOne({ _id: id });
};
