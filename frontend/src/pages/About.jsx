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
            MediBook is a modern doctor appointment booking platform designed to make healthcare access simple, fast, and reliable. We connect patients with qualified and trusted healthcare professionals, allowing easy appointment scheduling from anywhere, at any time.
          </p>
          <p>
            Our mission is to reduce waiting time and improve the patient experience by offering a seamless digital solution. With MediBook, users can find the right specialist, view availability, and manage appointments effortlessly, ensuring quality healthcare is always within reach.
          </p>
          <p className="mt-6 text-xl font-semibold">Our Vision</p>
          <p>
            Our vision at MediBook is to make quality healthcare accessible to everyone through technology. We aim to simplify the doctor appointment process by creating a reliable, user-friendly platform that connects patients with healthcare professionals efficiently.
            By leveraging innovation and digital solutions, MediBook strives to reduce waiting times, improve patient care, and support a healthier, more connected community.
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
        <div className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>convience</b>
          <p>hello hello hello </p>
        </div>
        <div className='border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>presonilization</b>
          <p>hello hello hello </p>
        </div>
      </div>
    </div>
  )
}

export default About
