import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        geminiSuggestedMovies: null,
        tmdbMovieResults: null
    },
    reducers: {
        toggleGptSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGeminiMovieResult: (state, action) => {
            const { geminiSuggestedMovies, tmdbMovieResults } = action.payload;
            state.geminiSuggestedMovies = geminiSuggestedMovies;
            state.tmdbMovieResults = tmdbMovieResults
        },
        removeGeminiMovieResult: (state, action) => {
            state.geminiSuggestedMovies = null;
            state.tmdbMovieResults = null;
        }
    },
})
export const { toggleGptSearchView, addGeminiMovieResult, removeGeminiMovieResult } = gptSlice.actions;
export default gptSlice.reducer;