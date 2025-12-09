import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-600'>
        <p>
          ABOUT <span className='text-gray-700 font-medium'>US</span>
        </p>
      </div>

      {/* Image + Text side by side */}
      <div className='my-10 flex flex-col md:flex-row gap-12 items-center md:items-start'>
        {/* Left side - Image */}
        <img
          src={assets.about_image}
          alt="About us"
          className='w-full md:max-w-[360px] rounded-lg shadow-md'
        />

        {/* Right side - Text */}
        <div className='md:w-1/2 space-y-4 text-gray-700'>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos accusamus nam perspiciatis asperiores quibusdam?
            Quas modi expedita, asperiores, necessitatibus sequi dolor ad reiciendis magni beatae provident facere inventore, dolores quos!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto officia similique ipsa mollitia consequuntur, corporis quibusdam eius?
            Totam ab officiis veniam omnis dolor dolores consectetur, nobis iste, architecto, similique reiciendis.
          </p>
          <p className="mt-6 text-xl font-semibold">Our Vision</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam impedit, repellendus et ea accusantium,
            totam mollitia eligendi officia numquam est laudantium, accusamus omnis. Facere explicabo saepe pariatur delectus odit!
          </p>
        </div>
      </div>
      <div className='text' >
        <p>WHY <span className='text-gray-700 font-semibold'>Choose us</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency</b>
          <p>hello hello hello </p>
          </div>
        <div  className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>convience</b>
          <p>hello hello hello </p>
        </div>
        <div  className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>presonilization</b>
          <p>hello hello hello </p>
        </div>
      </div>
    </div>
  )
}

export default About
