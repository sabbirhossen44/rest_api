import React from 'react'

const FContact = ({className}) => {
  return (
   <div className={`${className}`}>
        <h2 className=' text-bastext-primary font-bold ease-in duration-300 cursor-pointer'>(052) 611-5711</h2>
        <h2 className='text-secondary text-base hover:text-primary hover:font-bold ease-in duration-300 cursor-pointer'>company@domain.com</h2>
   </div>
  )
}

export default FContact