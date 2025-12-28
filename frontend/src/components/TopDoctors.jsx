import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-500 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
          >
            <img className='bg-blue-50' src={item.image} alt="" />

            <div className='p-4'>
              {/* Availability (dynamic) */}
              <div className="flex items-center gap-2 text-sm text-center">
                <p
                  className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-red-500"
                    }`}
                ></p>
                <p className={item.available ? "text-green-500" : "text-red-500"}>
                  {item.available ? "Available" : "Not Available"}
                </p>
              </div>

              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate('') }}
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
      >
        more
      </button>
    </div>
  )
}

export default TopDoctors
