import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Search.module.css';

const Search = ({ isDisabled = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(history);
  }, []);

  const saveSearch = (term) => {
    if (!term.trim()) return;
    
    const newHistory = [
      term,
      ...searchHistory.filter(item => item !== term)
    ].slice(0, 5);
    
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    saveSearch(searchTerm);
    await router.push(`/books/search?q=${encodeURIComponent(searchTerm)}`);
    setIsLoading(false);
  };

  const handleHistoryClick = async (term) => {
    setSearchTerm(term);
    setIsLoading(true);
    await router.push(`/books/search?q=${encodeURIComponent(term)}`);
    setIsLoading(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchInputGroup}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search books by title or author..."
            className={`${styles.searchInput} ${isLoading ? styles.loading : ''}`}
          />
          <button
            type="submit"
            className={`${styles.searchButton} ${isLoading ? styles.loading : ''}`}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {searchHistory.length > 0 && (
        <div className={styles.historyContainer}>
          <div className={styles.historyHeader}>
            <h3 className={styles.historyTitle}>Recent Searches</h3>
            <button
              onClick={clearHistory}
              className={styles.clearButton}
            >
              Clear History
            </button>
          </div>
          <div className={styles.historyTags}>
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(term)}
                className={styles.historyTag}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;