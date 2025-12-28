import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {


  return (
    <div className='text-center text-2xl pt-10 text-gray-500'>
      <div>
        <p>CONTACT<span className='text-gray-700 font-semibold'> US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-sstart gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>123 ABC PARK </p>
          <p className='text-gray-500'>tel:987654321</p>
          <p className='font -semibold text-lg text-gray-600'>Carrer at Medibook</p>
          <p>learn about our team</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
