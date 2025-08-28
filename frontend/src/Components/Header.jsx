import React, { useContext } from 'react'
import { assets } from '../assets/frontend_assets'
import { AppContext } from '../Context/ShopContext'


const Header = () => {

  const {navigate} = useContext(AppContext);

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg-px-20'>
        {/* Left Section */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg-text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'> Find the Best Deals <br /> <span className='text-yellow-400'>Buy</span> & <span className='text-yellow-400'>Sell</span> with Ease. </p>
      

      <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
        <p> Discover a variety of quality products at unbeatable prices, <br className='hidden sm:block' /> from trusted sellers in your area. </p>
      </div>
      <a onClick={()=> navigate('/collection')} className='flex items-center gap-2 bg-yellow-400 px-8 py-3 rounded text-black text-sm m-auto md:m-0 cursor-pointer hover:scale-105 transition-all duration-300 font-medium'> Start Shopping <img className='w-3' src={assets.arrowIcon} alt="" /></a>
      </div>

    {/* Right Section */}
      <div className='md:w-1/2 relative'>
        <img className='w-auto md:absolute bottom-0 h-auto rounded-lg' src={assets.headerImage} alt="" />
      </div>
    </div>
    
  )
}

export default Header
