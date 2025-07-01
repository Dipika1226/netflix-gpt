import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
    const { geminiSuggestedMovies, tmdbMovieResults } = useSelector(store => store.gpt);
    if (!geminiSuggestedMovies) return null;
    return (
        <div className='bg-gray-900'>
            <div className='p-4 m-6 bg-black text-white'>
                {geminiSuggestedMovies.map((movieName, index) => <MovieList key={movieName} title={movieName} movies={tmdbMovieResults[index]} />)}
            </div>
        </div>
    )
}

export default GptMovieSuggestions