import clientPromise from '@/lib/mongodb';

export const addUserSearchHistory = async (userId, query) => {
  const client = await clientPromise;
  const db = client.db('bookstore');
  return await db
    .collection('user_history')
    .updateOne({ userId }, { $push: { history: query } }, { upsert: true });
};

export const getUserSearchHistory = async (userId) => {
  const client = await clientPromise;
  const db = client.db('bookstore');
  return await db.collection('user_history').findOne({ userId });
};
