import { useRouter } from "next/router";
import { getBooksByGenre, getAllGenres } from "@/helpers/api-utils";
import { Booklist } from "@/components/Booklist"; // Adjust the path as per your structure

export default function GenreBooksPage({ books }) {
  const router = useRouter();
  const { id } = router.query;

  // Handle fallback state for SSG
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Books</h1>
      {/* Use the Booklist component here to display the books */}
      <Booklist books={books} />
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch('http://localhost:3000/api/genres');
  const data = await response.json();
  const genres = data.genres || [];  // Extract genres from the response object

  const paths = genres.map((genre) => ({
    params: { id: genre._id.toString() },  // Assuming your genres have _id
  }));

  return {
    paths,
    fallback: true,
  };
}


export async function getStaticProps(context) {
  const { params } = context;
  //context.params.id is the id of the genre
  const books = await getBooksByGenre(params.id);

  return {
    props: {
      books,
    },
  };
}
