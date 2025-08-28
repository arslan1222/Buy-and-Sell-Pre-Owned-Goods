import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidbar = () => {
  const navItems = [
    { path: '/list', label: 'List Items', icon: assets.order_icon },
    { path: '/orders', label: 'Order Items', icon: assets.order_icon },
    { path: '/all-users', label: 'All Users', icon: assets.order_icon }
  ];

  return (
    <div className='w-[18%] min-h-screen bg-gray-100 border-r shadow-sm'>
      <div className='flex flex-col gap-4 pt-10 pl-6 pr-2 text-[15px]'>
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 
              ${isActive ? 'bg-primary shadow-md text-white' : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            <img className='w-5 h-5' src={item.icon} alt={item.label} />
            <span className='hidden md:block'>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidbar
