import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='absolute pt-[15%] pl-[2%] bg-gradient-to-r from-black w-screen text-white aspect-video'>
            <h1 className='text-6xl font-bold mb-8'>{title}</h1>
            <p className='mb-8 w-1/4'>{overview}</p>
            <button className='bg-white text-black mx-2 px-6 py-4 text-xl rounded-xl hover:bg-opacity-85 '><img className="w-8 h-8 inline" src="https://imgs.search.brave.com/BTH76J-658peNUaRwinfZQYuuHUz2SBSGEAdaxb_zms/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC85Ni85Ny9w/bGF5LWJ1dHRvbi1i/bGFjay1nbHlwaC11/aS1pY29uLXZlY3Rv/ci00MzMzOTY5Ny5q/cGc" alt='playbuttonicon'></img> Play Now</button>
            <button className='bg-gray-500 text-white mx-2 px-6 py-4 text-2xl rounded-xl bg-opacity-60 '><img className='w-9 h-8 inline pr-1' src="https://img.icons8.com/ios/50/info--v1.png" alt="info--v1" />More info</button>
        </div>
    )
}

export default VideoTitle