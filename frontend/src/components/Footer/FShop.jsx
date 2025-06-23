import React from 'react'

const FShop = ({className}) => {
  return (
    <div className={`${className}`}>
        <h3 className='text-xl font-bold uppercase'>SHOP</h3>
        <ul className='mt-4 flex flex-col gap-2'>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Category</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Category</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Category</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Category</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Category</li>
        </ul>
      </div>
  )
}

export default FShop