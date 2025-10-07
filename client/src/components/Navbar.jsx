import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { credit, loadCreditData } = useContext(AppContext)

    const { openSignIn } = useClerk();
    const { isSignedIn, user } = useUser();
    const navigate=useNavigate()

    useEffect(() => {
        if (isSignedIn) {
            loadCreditData()
        }
    }, [isSignedIn])
    return (
        <div className='flex justify-between items-center py-4 mx-12 lg:mx-24'>
            <Link to='/'>
                <img className='w-32 sm:w-44' src={assets.logo} alt="" />
            </Link>
            {isSignedIn ? <div className='flex items-center gap-2 sm:gap-3'>
                <button onClick={()=>navigate('/buycredits')} className='flex items-center gap-2 bg-blue-100 px-2 sm:px-7 py-1 sm:py-2 rounded-full hover:scale-105 cursor-pointer transition-all duration-700'>
                <img className='w-5 ' src={assets.credit_icon} alt="" />
                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits:{credit}</p>
            </button>
            <p className='text-gray-600 max-sm:hidden'>Hi, {user.fullName}</p>
            <UserButton /></div> 
                : <button onClick={() => openSignIn({})} className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full cursor-pointer hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-500 transition-all duration-200'>Get Started
                    <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="" />
                </button>}

        </div>
    )
}

export default Navbar
