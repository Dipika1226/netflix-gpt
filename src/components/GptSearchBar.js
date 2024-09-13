import React from 'react'
import { useSelector } from 'react-redux'
import lang from "../utils/languageConstants";
const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang)
    return (
        <div className='pt-[10%] flex justify-center'>
            <form onSubmit={(e) => e.preventDefault()} className='bg-black w-1/2 grid grid-cols-12'>
                <input placeholder={lang[langKey].gptSearchPlaceholder} type='text' className='text-white m-4 p-4 col-span-10'></input>
                <button className='bg-red-700 p-4 m-4 rounded-lg col-span-2 text-white'>{lang[langKey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar