const VideoTitle = ({ title, overview }) => {
    return (
        <div className='absolute pt-[28%] md:pt-[18%] pl-[2%] bg-gradient-to-r from-black w-screen text-white aspect-video'>
            <h1 className='text-xl md:text-5xl font-bold mb-1 md:mb-6'>{title}</h1>
            <p className='hidden md:block mb-7 w-1/4'>{overview}</p>
            <button className='bg-white text-black md:mx-2 px-3 py-2 text-xs md:text-lg rounded-xl hover:bg-opacity-85 '><img className="w-4 h-4 md:w-8 md:h-8 inline" src="https://imgs.search.brave.com/BTH76J-658peNUaRwinfZQYuuHUz2SBSGEAdaxb_zms/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC85Ni85Ny9w/bGF5LWJ1dHRvbi1i/bGFjay1nbHlwaC11/aS1pY29uLXZlY3Rv/ci00MzMzOTY5Ny5q/cGc" alt='playbuttonicon'></img> Play Now</button>
            <button className='bg-gray-500 text-white mx-1 px-3 py-2 text-lg rounded-xl bg-opacity-60 hidden md:inline-block '><img className='w-9 h-8 inline pr-1' src="https://img.icons8.com/ios/50/info--v1.png" alt="info--v1" />More info</button>
        </div>
    )
}

export default VideoTitle