import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'
const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies)
    return (
        <div className='bg-black'>
            <div className='mt-[-20%] z-20 relative'>
                < MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
                <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
                <MovieList title={"Popular"} movies={movies.popularMovies} />
                <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
            </div>
        </div>
    )
}

export default SecondaryContainer