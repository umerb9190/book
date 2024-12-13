import { useRouter } from 'next/router';
import styles from "@/styles/404.module.css"
export default function Custom404() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>
        Oops! The page you&aposre looking for doesn&apost exist.
      </p>
      <button 
        className={styles.button}
        onClick={() => router.push('/')}
      >
        Return Home
      </button>
    </div>
  );
}