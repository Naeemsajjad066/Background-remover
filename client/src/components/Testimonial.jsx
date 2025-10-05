import React from 'react'
import { testimonialsData } from '../assets/assets'

const Testimonial = () => {
    return (
        <div className='pb-10 md:pb-20 mx-2'>
            {/*title*/}
            <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5'>Customer Testimonials</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8 '>
                {testimonialsData.map((item, index) => (
                    <div key={index} className='bg-white rounded-xl p-6 drop-shodow-lg max-w-lg mx-auto hover:scale-105 transition-all duration-700 cursor-pointer'>
                        <p className='text-4xl text-gray-600'>”</p>
                        <p className='text-sm text-gray-600'>{item.text}</p>
                        <div className='flex items-center mt-5 gap-3'>
                            <img className='w-10 h-10 rounded-full ' src={item.image} alt="" />
                            <div className='pl-2'>
                                <p className='font-semibold'>{item.author}</p>
                                <p className='text-sm text-gray-700'>{item.jobTitle}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial
