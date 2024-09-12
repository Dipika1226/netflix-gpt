import React from 'react'
import { CDN_IMG_URL } from '../utils/constants'
const MovieCard = ({ posterpath, title }) => {
    return (
        <div className='w-64 pr-6'>
            <img alt={title} src={CDN_IMG_URL + posterpath}></img>
        </div>
    )
}

export default MovieCard