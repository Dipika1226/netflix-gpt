import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'

const GptSearchPage = () => {
    return (
        <div className='bg-gradient-to-b from bg-gray-900 h-screen opacity-90'>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    )
}

export default GptSearchPage