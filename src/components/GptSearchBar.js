// import React from 'react'
// import { useSelector } from 'react-redux'
// import lang from "../utils/languageConstants";
// const GptSearchBar = () => {
//     const langKey = useSelector((store) => store.config.lang)
//     return (
//         <div className='pt-[10%] flex justify-center'>
//             <form onSubmit={(e) => e.preventDefault()} className=' w-1/2 grid grid-cols-12'>
//                 <input placeholder={lang[langKey].gptSearchPlaceholder} type='text' className='text-white m-4 p-4 col-span-10 rounded-3xl bg-white bg-opacity-90 outline-none'></input>
//                 <button className='bg-red-700 p-4 m-4 rounded-lg col-span-2 text-white'>{lang[langKey].search}</button>
//             </form>
//         </div>
//     )
// }

// export default GptSearchBar
// src/components/GptSearchBar.js
import { useRef } from "react";
import client from "../utils/genAi";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGeminiMovieResult } from "../utils/gptSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);


    // Search movie in TMDB API
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
            API_OPTIONS
        );
        const json = await data.json();
        return json.results;
    };

    const handleGeminiSearchClick = async () => {
        const query = searchText.current.value;

        // Define the GPT-like query prompt
        const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${query}. Only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

        try {
            // Get the response from Gemini API
            // Use the model to generate content
            //const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            //const result = await model.generateContent(gptQuery);
            // const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

            // // Make the request using the model's generateContent method
            // const result = await model.generateContent(gptQuery);

            // // Handle the result (for example, display the result in the console)
            // console.log(result.response.text());
            // Use the client to generate the response from the Gemini API
            const response = await client.chat.completions.create({
                messages: [gptQuery],
                model: "gemini-1.5-flash",
            });

            const gptMovies = response?.candidates[0]?.text?.split(",");;

            const promiseArray = gptMovies.map((movies) => searchMovieTMDB(movies));

            const tmdbResults = await Promise.all(promiseArray);
            console.log(tmdbResults);

            // Dispatch the results to the Redux store
            dispatch(
                addGeminiMovieResult({ geminiSuggestedMovies: gptMovies, tmdbMovieResults: tmdbResults })
            );
        } catch (error) {
            console.error("Error fetching from Gemini API:", error);
        }
    };

    return (
        <div className="pt-[35%] md:pt-[10%] flex justify-center">
            <form
                className="w-full md:w-1/2 bg-black grid grid-cols-12"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searchText}
                    type="text"
                    className="p-4 m-4 col-span-9"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
                    onClick={handleGeminiSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
