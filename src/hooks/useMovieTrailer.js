import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const getMovieTrailer = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_OPTIONS);
        const response = await data.json();
        console.log(response.results)
        const filteredData = response.results.filter((video) => video.type === "Trailer");
        const trailer = filteredData.length ? filteredData[0] : response.results[0];
        console.log(trailer)
        dispatch(addTrailerVideo(trailer))
    }
    useEffect(() => {
        getMovieTrailer();
    }, [])
}

export default useMovieTrailer
