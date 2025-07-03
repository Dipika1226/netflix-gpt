import React from 'react'
import VideoTitle from './VideoTitle'
import BackgroundVideo from './BackgroundVideo'
import { useSelector } from 'react-redux'

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies)
    if (!movies) return;
    const mainMovie = movies[1];
    //console.log(mainMovie);
    return (
        <div className='pt-12 md:pt-0'>
            <VideoTitle title={mainMovie.original_title} overview={mainMovie.overview} />
            <BackgroundVideo movieId={mainMovie.id} />
        </div>
    )
}

export default MainContainer