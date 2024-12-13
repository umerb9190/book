export const getAllbooks = async ()=>{
    const response=await fetch('http://localhost:3000/api/books');
    const data=await response.json();
    return data;
}
export const getBookById= async (id)=>{
    const response=await fetch(`http://localhost:3000/api/books/${id}`);
    const data=await response.json();
    return data;
}

export const getFeaturedBooks = async () => {
    const response = await fetch('http://localhost:3000/api/books');
    const data = await response.json();
    const maxrating = Math.max(...data.map(book => book.rating));
    const minrating = Math.min(...data.map(book => book.rating));
    const averagerating = (maxrating + minrating) / 2;
    const featuredBooks = data.filter(book => book.rating >= averagerating);
    return featuredBooks;
};

export const getBooksByGenre = async (genreId) => {
    const response = await fetch(`http://localhost:3000/api/genres/${genreId}/books`);
    const data = await response.json();
    return data;
};
export const getAllGenres = async () => {
    const response= await fetch('http://localhost:3000/api/genres');
    const data=await response.json();
    return data;
};
export const getAllAuthors= async()=>{
    const response= await fetch('http://localhost:3000/api/authors');
    const data=await response.json();
    return data;
};
  
export const getGenreById = async(id) => {
    const response=await fetch(`http://localhost:3000/api/genres/${id}`);
    const data=await response.json();
    return data;
};
export const getAuthorById= async(id)=>{
    const response=await fetch(`http://localhost:3000/api/authors/${id}`);
    const data=await response.json();
    return data;
}