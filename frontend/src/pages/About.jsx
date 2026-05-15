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
      <div className='text-center py-12'>
        <p className='text-3xl md:text-4xl font-bold text-gray-800 tracking-wide'>
          WHY <span className='text-[#5f6FFF]'>Choose Us</span>
        </p>
        <div className='w-24 h-1 bg-[#5f6FFF] mx-auto mt-3 rounded-full'></div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-20'>

        <div className='group border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-white cursor-pointer'>
          <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#eef1ff] text-[#5f6FFF] text-2xl font-bold mb-6 transition-all duration-200'>
            ⚡
          </div>
          <b className='text-2xl text-gray-800'>
            Efficiency
          </b>
          <p className='text-gray-600 mt-4 leading-7 text-[15px]'>
            Book appointments quickly with a simple, step-by-step flow — no unnecessary delays.
          </p>
        </div>

        <div className='group border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-white cursor-pointer'>
          <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#eef1ff] text-[#5f6FFF] text-2xl font-bold mb-6 transition-all duration-200'>
            📅
          </div>
          <b className='text-2xl text-gray-800'>
            Convenience
          </b>
          <p className='text-gray-600 mt-4 leading-7 text-[15px]'>
            Choose your doctor and preferred time slot anytime, anywhere, and manage appointments easily.
          </p>
        </div>

        <div className='group border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-white cursor-pointer'>
          <div className='w-14 h-14 flex items-center justify-center rounded-full bg-[#eef1ff] text-[#5f6FFF] text-2xl font-bold mb-6 transition-all duration-200'>
            👨‍⚕️
          </div>
          <b className='text-2xl text-gray-800'>
            Personalization
          </b>
          <p className='text-gray-600 mt-4 leading-7 text-[15px]'>
            Find the right specialist with detailed doctor profiles, ratings, and availability information.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
