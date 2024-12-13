import { useRouter } from 'next/router';
import styles from './Booklist.module.css';

export function Booklist({ books }) {
  const router = useRouter();

  return (
    <div className={styles.bookGrid}>
      {books.map((book) => (
        <div key={book.id} className={styles.bookCard}>
          <h2 className={styles.bookTitle}>{book.title}</h2>
          <div className={styles.rating}>
            {'★'.repeat(Math.floor(book.rating))}
            {'☆'.repeat(5 - Math.floor(book.rating))}
            <span>({book.rating})</span>
          </div>
          <p className={styles.bookPrice}>${book.price.toFixed(2)}</p>
          <button 
            className={styles.viewButton}
            onClick={() => router.push(`/books/${book.id}`)}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}