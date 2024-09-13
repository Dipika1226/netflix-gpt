import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LAGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);
    const handleGptSearchView = () => {
        dispatch(toggleGptSearchView());
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
        <div className=' py-2 px-10 bg-gradient-to-b from-black w-screen z-10 flex justify-between absolute'>
            <img className="w-48" src={LOGO} alt='logo'></img>

            {user && <div className='flex p-4'>
                {showGptSearch && <select onChange={handleLanguageChange} className='bg-gray-500 text-white px-4 m-2 rounded-lg bg-opacity-60 '>
                    {SUPPORTED_LAGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                </select>}
                <button className='bg-red-700 rounded-lg m-2 px-8 text-white' onClick={handleGptSearchView}>{showGptSearch ? "Home" : "GPTSearch"}</button>
                <img className='w-14 h-14 -pb-2 rounded-lg m-2' src={user.photoURL} alt='userIcon'></img>
                <button onClick={handleSignOut} className='font-bold text-white'>(Sign out)</button>
            </div>}
        </div>
    )
}

export default Header