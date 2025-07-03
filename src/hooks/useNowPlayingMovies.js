import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)
    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const response = await data.json();
        // console.log(response.results);
        dispatch(addNowPlayingMovies(response.results));
    }
    useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies();
    }, [])
}
export default useNowPlayingMovies;