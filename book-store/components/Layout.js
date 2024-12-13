// components/Layout.js
import { useState, useEffect } from 'react';
import styles from './Layout.module.css';
import Header from './Header';

export default function Layout({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setDarkMode(JSON.parse(savedMode));
        }
    }, []);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <div className={styles.layout}>
            <Header /> {/* Include Header here */}
            <button 
                onClick={() => setDarkMode(!darkMode)}
                className={styles.themeToggle}
            >
                {darkMode ? '☀️' : '🌙'}
            </button>
            <main>{children}</main>
        </div>
    );
}
