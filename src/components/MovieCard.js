import React from 'react'
import { CDN_IMG_URL } from '../utils/constants'
const MovieCard = ({ posterpath, title }) => {
    if (!posterpath) return null;
    return (
        <div className='w-52 pr-6 shadow-lg shadow-white'>
            <img alt={title} src={CDN_IMG_URL + posterpath}></img>
        </div>
    )
}

export default MovieCard