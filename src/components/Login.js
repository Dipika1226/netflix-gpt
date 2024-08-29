import React, { useState } from 'react';
import Header from './Header';
const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (

        <div>
            <Header />
            <div>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/1d29f9a4-1900-43dc-a420-99044f734ee2/cc3b7bcb-3f79-449e-a37c-26ffb20fce3c/IN-en-20240826-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7a193436-88c7-4f66-a8f0-e191d3b26d13_small.jpg" alt='bg-img'></img>
            </div>
            <form className='w-4/12 bg-black absolute flex flex-col mx-auto right-0 left-0 top-[20%] p-20 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-5xl py-8'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (<input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-md'></input>)}
                <input type='email' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 rounded-md'></input>
                <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-md'></input>
                <button className='p-4 my-4 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix?Sign Up Now" : "Already registered,Sign in now"}</p>
            </form>
        </div>
    )
}

export default Login