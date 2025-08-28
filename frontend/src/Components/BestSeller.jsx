import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const BestSeller = () => {

    const { products, currency, allUsers } = useContext(AppContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(()=>{
        setBestSeller(products.slice(0,6))
    }, [products])

  return (
    <div className='flex flex-col gap-4 my-16 text-gray-900 md:mx-10'>
       <div className='flex flex-col w-full mt-8 mb-5'>
        <div className='flex flex-col items-end w-max mb-5'>
          <p className='text-3xl font-medium uppercase'>Best Seller</p>
          <div className='w-24 h-0.5 bg-primary rounded-full'></div>
        </div>
        <p className='sm:w-1/3 text-sm'>Explore the best-selling pre-owned items, handpicked for their quality and value.</p>
      </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 ms:grid-cols-4 lg:grid-cols-5 gap-1 gap-y-6'>
          {allUsers.slice(0, 5).map((user, index) => (
            <div
              key={index}
              className='w-44 bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300'
            >
              <img
                src={user.image || 'https://via.placeholder.com/150'}
                alt={user.name}
                className='w-full h-40 object-cover rounded-xl mb-4'
              />
              <h2 className='text-lg font-semibold text-gray-800'>{user.name}</h2>
              <p className='text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap'>{user.email}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default BestSeller