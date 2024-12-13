import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router'; // Import useRouter
import { getFeaturedBooks } from "@/helpers/api-utils";
import { Booklist } from "@/components/Booklist";
export default function Home({ books }) {
  const router = useRouter();
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Book Store</h1>
      <Booklist books={books}/>
      <div className={styles.buttonContainer}>
        <button 
          className={styles.button}
          onClick={() => router.push('/genres')}
        >
          View Genres
        </button>
        <button 
          className={styles.button}
          onClick={() => router.push('/books')}
        >
          View All Books
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await getFeaturedBooks();
  
  return {
    props: {
      books: data,
    },
    revalidate: 3600,
  };
}