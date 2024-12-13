import clientPromise from '@/lib/mongodb';

export const getAllAuthors = async () => {
  const client = await clientPromise;
  const db = client.db('bookstore');
  return await db.collection('authors').find().toArray();
};

export const getAuthorById = async (id) => {
  const client = await clientPromise;
  const db = client.db('bookstore');
  return await db.collection('authors').findOne({ _id: id });
};
