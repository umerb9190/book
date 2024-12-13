import { getAllGenres } from "@/helpers/api-utils";
import styles from '@/styles/Genres.module.css';
import Link from "next/link";

export default function Genres({ genres }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Book Genres</h1>
            <div className={styles.genreGrid}>
                {genres.map((genre) => (
                    <Link 
                        href={`/genres/${genre.id}`}
                        key={genre.id}
                        className={styles.genreCard}
                    >
                        <h2>{genre.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Using SSR instead of SSG
export async function getServerSideProps() {
    const {genres,mess} = await getAllGenres();
    console.log(mess,genres)
    return {
        props: {
            mess,
            genres
        }
    };
}