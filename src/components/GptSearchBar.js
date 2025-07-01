import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGeminiMovieResult, removeGeminiMovieResult } from "../utils/gptSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const [statusMessage, setStatusMessage] = useState(""); // <-- ✅ local status

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

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
        if (!query.trim()) {
            setStatusMessage("Please enter a search query.");
            return;
        }
        dispatch(removeGeminiMovieResult());
        setStatusMessage("Searching...");

        const prompt = `Act as a Movie Recommendation system and suggest some movies for the query: ${query}. Only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();

            const geminiMovies = text.split(",").map((m) => m.trim()).filter(Boolean);

            if (!geminiMovies || geminiMovies.length === 0) {
                setStatusMessage("No movie suggestions found from Gemini.");
                return;
            }
            console.log(geminiMovies)
            const tmdbResults = await Promise.all(geminiMovies.map(searchMovieTMDB));

            const filteredResults = tmdbResults.filter((res) => res.length > 0);
            console.log(filteredResults)
            if (filteredResults.length === 0) {
                setStatusMessage("No matching movies found on TMDB.");
                return;
            }

            dispatch(
                addGeminiMovieResult({
                    geminiSuggestedMovies: geminiMovies,
                    tmdbMovieResults: filteredResults,
                })
            );

            setStatusMessage(""); // clear message
        } catch (error) {
            console.error("Error fetching from Gemini API:", error);
            setStatusMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="pt-[35%] md:pt-[10%] flex flex-col items-center">
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

            {statusMessage && (
                <div className="text-white mt-4 text-sm bg-gray-800 p-2 rounded">
                    {statusMessage}
                </div>
            )}
        </div>
    );
};

export default GptSearchBar;
