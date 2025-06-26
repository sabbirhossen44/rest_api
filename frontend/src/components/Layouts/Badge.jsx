import React from 'react'

const Badge = ({discount, className}) => {
  return (
    <div className={`absolute top-5 left-5 bg-primary inline-block text-white py-2 px-7 text-base  font-bold ${className}`}>-{discount}%</div>
  )
}

export default Badge