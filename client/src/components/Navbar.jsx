import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {

    const {openSignIn} = useClerk();
    const {isSignedIn,user}=useUser();
    return (
        <div className='flex justify-between items-center py-4 mx-12 lg:mx-24'>
            <Link to='/'>
                <img className='w-32 sm:w-44' src={assets.logo} alt="" />
            </Link>
            {isSignedIn?<div><UserButton/></div>
            : <button  onClick={()=>openSignIn({})} className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full cursor-pointer hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-500 transition-all duration-200'>Get Started
                <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="" />
            </button>}

        </div>
    )
}

export default Navbar
