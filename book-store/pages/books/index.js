import { useState } from 'react';
import { getAllbooks, getAllGenres } from "@/helpers/api-utils";
import { Booklist } from "@/components/Booklist";
import styles from '@/styles/BookDetail.module.css';

export default function AllBooks({ books, genres }) {
    const [selectedGenre, setSelectedGenre] = useState('all');
    
    const filteredBooks = selectedGenre === 'all' 
        ? books 
        : books.filter(book => book.genreId === selectedGenre);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>All Books</h1>
            
            <div className={styles.filterContainer}>
                <select 
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="all">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>

            <Booklist books={filteredBooks} />
        </div>
    );
}

export async function getStaticProps() {
    const allBooks = await getAllbooks();
    const genres = await getAllGenres();
    
    if(!allBooks || !genres) {
        return {
            redirect: {
                destination: '/error',
                permanent: false
            }
        };
    }

    

    return {
        props: {
            books: allBooks,
            genres
        },
        revalidate: 3600 // ISR: Revalidate every hour
    };
}