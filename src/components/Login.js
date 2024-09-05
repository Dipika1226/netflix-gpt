import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
    const navigate = useNavigate();
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
        console.log(email);
        const message = checkValidData(email.current.value, password.current.value);
        console.log(message);
        console.log(email.current.value)
        console.log(password.current.value)
        // console.log(name.current.value)
        setErrorMessage(message);
        if (message) return;
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://imgs.search.brave.com/tk-DHYa8-ceby19GA7OLpLNRA0SMbzPWYGujj7R8QFc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbmV0/ZmxpeC1wcm9maWxl/LXBpY3R1cmVzLTEw/MDAteC0xMDAwLXFv/OWg4MjEzNHQ5bnYw/ajAuanBn"
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
                        navigate("/browse");
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
                    console.log(user);
                    navigate("/browse");
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
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/1d29f9a4-1900-43dc-a420-99044f734ee2/cc3b7bcb-3f79-449e-a37c-26ffb20fce3c/IN-en-20240826-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7a193436-88c7-4f66-a8f0-e191d3b26d13_small.jpg" alt='bg-img'></img>
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