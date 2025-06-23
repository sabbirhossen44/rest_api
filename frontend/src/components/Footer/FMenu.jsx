import React from 'react'

const FMenu = ({className}) => {
  return (
    <>
      <div className={`${className}`}>
        <h3 className='text-xl font-bold uppercase'>MENU</h3>
        <ul className='mt-4 flex flex-col gap-2'>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Home</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Shop</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>About</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Contact</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Journal</li>
        </ul>
      </div>
    </>
  )
}

export default FMenu