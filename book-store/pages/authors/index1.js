import useSWR from "swr";
import styles from "@/styles/Author.module.css"

// Define a fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AuthorsPage() {
  // Fetch data with SWR
  const { data: authors, error, isLoading} = useSWR("/api/authors", fetcher);

  // Handle loading and error states
  if(isLoading) return <div className={styles.loadingContainer}>Loading...</div>;
  if (error) return <div className={styles.errorContainer}>Failed to load authors.</div>;
  if (!authors) return <div className={styles.loadingContainer}>Loading...</div>;

  // Render the authors list
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Authors</h1>
      <div className={styles.authorGrid}>
        {authors.map((author) => (
          <div key={author.id} className={styles.authorCard}>
            <h2 className={styles.authorName}>{author.name}</h2>
            <p className={styles.biography}>{author.biography}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
