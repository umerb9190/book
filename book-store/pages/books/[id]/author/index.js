import { getBookById, getAuthorById, getAllbooks } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import { useAuth } from '@/context/AuthContext';
import styles from "@/styles/AuthorDetail.module.css";
import { useEffect } from "react";


export default function AuthorDetail({ author }) {
  const router = useRouter();
  const { user } = useAuth(); // Check user from context

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]); // Only runs if `user` or `router` changes

  if (router.isFallback) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{author.name}</h1>
      <h3 className={styles.biographyTitle}>Biography</h3>
      <p className={styles.biography}>{author.biography}</p>
      <button onClick={() => router.back()} className={styles.backButton}>
        Back
      </button>
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const bookId = params.id;

  // Get the book details to find the author ID
  const book = await getBookById(bookId);

  if (!book) {
    return {
      notFound: true,
    };
  }

  // Fetch the author using the authorId from the book
  const author = await getAuthorById(book.authorId);

  return {
    props: {
      author,
    },
  };
}

export async function getStaticPaths() {
  // Generate paths for each book's author page
  const books = await getAllbooks();
  const paths = books.map((book) => ({ params: { id: String(book.id) } }));

  return {
    paths,
    fallback: true,
  };
}
