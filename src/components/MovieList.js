import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    return (
        <div className='px-6'>
            <h1 className='text-4xl text-white py-6'>{title}</h1>
            <div className='flex overflow-x-scroll scrollbar-hide'>
                <div className='flex'>
                    {
                        movies?.map((movie) =>
                            <MovieCard key={movie.id} posterpath={movie.poster_path} title={title} />)
                    }
                </div>
            </div>

        </div>
    )
}

export default MovieList