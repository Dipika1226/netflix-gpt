import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { removeGeminiMovieResult, toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LAGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);
    const { geminiSuggestedResults } = useSelector((store) => store.gpt)
    const handleGptSearchView = () => {
        dispatch(toggleGptSearchView());
        if (showGptSearch) {
            dispatch(removeGeminiMovieResult());
        }
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
                navigate("/error");
            });

    }
    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL
                })
                )
                navigate("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, [])
    return (
        <div className=' py-0 md:px-10 bg-gradient-to-b from-black w-screen z-10 flex justify-between absolute bg-black md:bg-transparent'>
            <img className="w-28 md:w-44" src={LOGO} alt='logo'></img>

            {user && <div className='flex p-2 box-border'>
                {showGptSearch && <select onChange={handleLanguageChange} className='bg-gray-500 text-white px-1 md:px-4 my-5 mx-1 md:mx-2 py-1 md:py-0 rounded-lg bg-opacity-60 text-sm'>
                    {SUPPORTED_LAGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                </select>}
                <button className='bg-red-700 rounded-lg my-5 mx-1 md:mx-2 px-4 py-1 md:py-0 text-white text-sm' onClick={handleGptSearchView}>{showGptSearch ? "Home" : "GPTSearch"}</button>
                {user.photoURL && <img className='hidden md:inline-block w-10 h-10 mt-5 rounded-lg m-2' src={user.photoURL} alt='userIcon'></img>}
                <button onClick={handleSignOut} className='font-bold text-white text-sm'>(Sign out)</button>
            </div>}
        </div>
    )
}

export default Header