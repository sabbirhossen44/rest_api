import React from 'react'

const Heading = ({title, className}) => {
  return (
    <div className={`text-primary text-4xl font-bold ${className}`}>{title}</div>
  )
}

export default Heading