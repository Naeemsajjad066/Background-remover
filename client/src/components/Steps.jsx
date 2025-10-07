import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
    return (
        <div className='mx-4 lg:mx-24 py-20 xl:py-40'>
            <h1 className='text-center text-2xl md:text-3xl lg-text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent '>Steps to remove background <br /> image in seconds</h1>
            <div className='flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center'>
                <div className='flex items-start gap-4 bg-white  drop-shadow-lg p-5 pb-8 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer '>
                    <img className='max-w-9 ' src={assets.upload_icon} alt="" />
                    <div>
                        <p className='text-xl font-md'>Upload image</p>
                        <p className='text-sm text-neutral-500 mt-1'>This is demo text, will replace it later. <br /> This is demo text</p>
                    </div>
                </div>
                <div className='flex items-start gap-4 bg-white  drop-shadow-lg p-5 pb-8 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer '>
                    <img className='max-w-9 ' src={assets.remove_bg_icon} alt="" />
                    <div>
                        <p className='text-xl font-md'>Remove Background</p>
                        <p className='text-sm text-neutral-500 mt-1'>This is demo text, will replace it later. <br /> This is demo text</p>
                    </div>
                </div>
                <div className='flex items-start gap-4 bg-white  drop-shadow-lg p-5 pb-8 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer '>
                    <img className='max-w-9 ' src={assets.download_icon} alt="" />
                    <div>
                        <p className='text-xl font-md'>Download image</p>
                        <p className='text-sm text-neutral-500 mt-1'>This is demo text, will replace it later. <br /> This is demo text</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Steps
