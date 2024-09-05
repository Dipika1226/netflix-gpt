import React from 'react'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';
const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate("/");
            }).catch((error) => {
                // An error happened.
                navigate("/error");
            });

    }
    return (
        <div className='absolute py-2 px-28 bg-gradient-to-b from-black w-screen z-10 flex justify-between'>
            <img className="w-48" src='https://imgs.search.brave.com/vq4rM2jnG_LzMeZHGVj-BEoZt4Dh_sgI32r0Q2xK5bw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1Mjku/cG5n' alt='logo'></img>

            {user && <div className='flex p-4'>
                <img className='w-16 h-16' src={user.photoURL} alt='userIcon'></img>
                <button onClick={handleSignOut} className='font-bold text-white'>(Sign out)</button>
            </div>}
        </div>
    )
}

export default Header