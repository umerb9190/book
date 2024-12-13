import { getAllbooks, getBookById, getGenreById } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import styles from '@/styles/BookDetail.module.css';

export default function BookDetail({ book,genra }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{book.title}</h1>
      
      <div className={styles.metadata}>
        <div className={styles.metadataItem}>
          <span className={styles.label}>Price</span>
          <span className={styles.value}>${book.price}</span>
        </div>
        <div className={styles.metadataItem}>
          <span className={styles.label}>Rating</span>
          <span className={styles.value}>
            {'★'.repeat(Math.floor(book.rating))}
            {'☆'.repeat(5 - Math.floor(book.rating))}
            <span>({book.rating})</span>
          </span>
        </div>
        <div className={styles.metadataItem}>
          <span className={styles.label}>Genre</span>
          <span className={styles.value}>{genra.name}</span>
        </div>
      </div>

      <p className={styles.description}>{book.description}</p>

      <button 
        className={styles.authorButton}
        onClick={() => router.push(`/books/${book.id}/author`)}
      >
        View Author
      </button>
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const bookId = params.id;
  const book = await getBookById(bookId);
  const genra=await getGenreById(book.genreId);
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,genra
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const books = await getAllbooks();
  const paths = books.map((book) => ({ 
    params: { id: book.id.toString() } 
  }));

  return {
    paths,
    fallback: true,
  };
}