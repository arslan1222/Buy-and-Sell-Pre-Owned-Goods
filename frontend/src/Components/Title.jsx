import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb:-3'>
        <p className='text-black uppercase'>{text1} <span className=' font-medium'>{text2}</span></p>
        <p className='w-8 sm:w-12 h-[2px] sm:h-[3px] bg-primary'></p>
    </div>
  )
}

export default Title