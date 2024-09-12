import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)
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
                <button className='bg-purple-700 rounded-lg p-2 m-2 text-white' onClick={handleGptSearchView}>GPTSearch</button>
                <img className='w-16 h-16 rounded-lg mx-2' src={user.photoURL} alt='userIcon'></img>
                <button onClick={handleSignOut} className='font-bold text-white'>(Sign out)</button>
            </div>}
        </div>
    )
}

export default Header