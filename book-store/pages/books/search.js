import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Search from '@/components/Search';
import styles from '@/styles/SearchResults.module.css';

export default function SearchResults({ initialResults }) {
  const router = useRouter();
  const { q } = router.query;
  const { user } = useAuth();
  const [results, setResults] = useState(initialResults);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Fetch and save search history
  const fetchSearchHistory = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/user/history?userId=${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch search history');
      const data = await response.json();
      console.log("response result: ", data);
      setSearchHistory(data.history || []);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  useEffect(() => {
    const saveSearchToHistory = async (query) => {
      if (!user?.id) return;

      try {
        await fetch('/api/user/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            query,
          }),
        });
      } catch (error) {
        console.error('Failed to save search history:', error);
      }
    };

    const fetchBooksAndSearch = async () => {
      if (q) {
        setIsLoading(true);
        try {
          const response = await fetch('/api/books');
          const books = await response.json();

          const searchResults = books.filter((book) =>
            book.title.toLowerCase().includes(q.toLowerCase())
          );

          setResults(searchResults);
          await saveSearchToHistory(q);
          await fetchSearchHistory(); // Update search history after saving
        } catch (error) {
          console.error('Failed to fetch books or filter results:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBooksAndSearch();
  }, [q, user?.id]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Search isDisabled={false} />
        <div className={styles.loading}>
          <div className={styles.loadingSpinner} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Search isDisabled={results.length > 0} />
      <h2 className={styles.resultsHeader}>
        {results.length > 0
          ? `Search Results for "${q}"`
          : `No results found for "${q}"`}
      </h2>
      {results.length === 0 ? (
        <div className={styles.noResults}>
          Try searching for a different book or author
        </div>
      ) : (
        <div className={styles.resultsGrid}>
          {results.map((book) => (
            <Link href={`/books/${book.id}`} key={book.id} className={styles.bookCard}>
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.description}>
                  {book.description.substring(0, 100)}...
                </p>
                <div className={styles.bookMeta}>
                  <span className={styles.price}>${book.price}</span>
                  <div className={styles.rating}>
                    <span className={styles.starIcon}>★</span>
                    <span className={styles.ratingValue}>{book.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <h3>Search History</h3>
      <ul className={styles.historyList}>
        {searchHistory.map((item, index) => (
          <li key={index}>{item.query}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { q } = query;

  if (!q) {
    return {
      props: {
        initialResults: [],
      },
    };
  }

  try {
    const response = await fetch('http://localhost:3000/api/books');
    const books = await response.json();

    const searchResults = books.filter((book) =>
      book.title.toLowerCase().includes(q.toLowerCase())
    );

    return {
      props: {
        initialResults: searchResults,
      },
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      props: {
        initialResults: [],
      },
    };
  }
}
