import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] =  useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovieHandler(){
    setIsLoading(true);
    setError(false);
    try{
      const response = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) {
        throw new Error('Somthing went wrong!');
      }

      const data = await response.json();

      const TransformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });
      setMovies(TransformedMovies);
    } catch(error){
      setError(error.message);
    }
    setIsLoading(false);
    }
  
    let content = <p>Found no movie</p>;

    if(movies.length > 0){
      content = <MoviesList movies={movies} />
      
    }
    if(error){
      content = <p>{error}</p>
    }
    if(isLoading){
      content = <p>Loading...</p>
    }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
