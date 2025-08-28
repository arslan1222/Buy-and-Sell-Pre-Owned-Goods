import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import { AppContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const LatestCollection = () => {
    
    const { products, currency } = useContext(AppContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    }, [products])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <div className='flex flex-col w-full mt-8 mb-5'>
        <div className='flex flex-col items-end w-max mb-5'>
          <p className='text-3xl font-medium uppercase'>Top Products to buy</p>
          <div className='w-24 h-0.5 bg-primary rounded-full'></div>
        </div>
        <p className='sm:w-1/3 text-sm'>Simply browse through our extensive list of trusted products.</p>
      </div>

        {/* Rendering Products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 ms:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item, index)=>(
                  <Link
                    key={index}
                    className="border w-full border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                    to={`/product/${item._id}`}
                  >
                    <img
                      className="w-full h-60 object-cover"
                      src={item.image[0]}
                      alt={item.name}
                    />
                    <div className="p-4 bg-primary2">
                      <div className="flex items-center gap-2 text-sm text-center text-green-500">
                        <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                        <p>Available</p>
                      </div>
                      <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                      <p className="text-gray-600 text-sm">{currency}{item.price}</p>
                    </div>
                  </Link>
                ))
            }
        </div>

        

    </div>
  )
}

export default LatestCollection