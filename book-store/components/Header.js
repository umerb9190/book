import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Import useAuth hook
import styles from './Header.module.css';

export default function Header() {
    const { user, logout } = useAuth(); // Use the Auth context

    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/books/search">Search</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/authors">Authors</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/books">Books</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/genres">Genres</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/info/faq">Info</Link>
                    </li>
                    {/* Render user email if logged in */}
                    {user ? (
                        <>
                            <li className={styles.navItem}>Welcome, {user.email}</li>
                            <li className={styles.navItem}>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li className={styles.navItem}>
                            <Link href="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
