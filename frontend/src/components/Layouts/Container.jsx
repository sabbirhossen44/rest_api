import React from 'react'

const Container = ({className,children}) => {
  return (
    <div className={`max-w-container mx-auto font-dm ${className}`}>{children}</div>
  )
}

export default Container