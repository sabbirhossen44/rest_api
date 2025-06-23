import React from 'react'

const FHelp = ({className}) => {
  return (
    <div className={`${className}`}>
        <h3 className='text-xl font-bold uppercase'>HELP</h3>
        <ul className='mt-4 flex flex-col gap-2'>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Privacy Policy</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Terms & Conditions</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Special E-shop</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Shipping</li>
          <li className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>Secure Payments</li>
        </ul>
      </div>
  )
}

export default FHelp