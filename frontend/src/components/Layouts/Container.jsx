import React from 'react'

const Container = ({className,children}) => {
  return (
    <div className={`max-w-container 2xl:mx-auto mx-5 font-dm ${className}`}>{children}</div>
  )
}

export default Container