import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG, USER_AVATAR } from '../utils/constants';
const Login = () => {
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef();
    const password = useRef();
    const name = useRef();
    const [errorMessage, setErrorMessage] = useState(null);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const handleButtonClick = () => {
        //validate the form data
        // console.log(email);
        const message = checkValidData(email.current.value, password.current.value);
        // console.log(message);
        // console.log(email.current.value)
        // console.log(password.current.value)
        // console.log(name.current.value)
        setErrorMessage(message);
        if (message) return;
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // console.log(user);
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL
                        })
                        )
                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });

        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });

        }

    }
    return (

        <div>
            <Header />
            <div>
                <img src={BG_IMG} alt='bg-img'></img>
            </div>
            <form onSubmit={(e) => e.preventDefault()}
                className='w-4/12 bg-black absolute flex flex-col mx-auto right-0 left-0 top-[20%] p-20 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-5xl py-8'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (<input ref={name}
                    type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-md'></input>)}

                <input ref={email} type='email' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 rounded-md'></input>

                <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-md'></input>
                <p className='text-red-500'>{errorMessage}</p>
                <button className='p-4 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered,Sign in now"}</p>
            </form>
        </div>
    )
}

export default Login