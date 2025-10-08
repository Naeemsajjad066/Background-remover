import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUser } from '@clerk/clerk-react'

const App = () => {
  const { isLoaded } = useUser()

  // Show loading screen while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100  '>
      <ToastContainer position='bottom-right'/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/buycredits' element={<BuyCredit/>}/>
        <Route path='/result' element={<Result/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
