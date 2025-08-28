import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 justify-between px-[7%]'>
        <img className='w-14' src={assets.logo} alt="" />
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-2 py-2 sm:px-7 sm:py-2 rounded-full test-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar