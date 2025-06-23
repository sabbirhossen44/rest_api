import React from 'react'
import Logo from '../../assets/logo.png';

const FLogo = ({className}) => {
  return (
    <div className={`${className} text-left`}>
        <img src={Logo} alt="" className='w-[100px] object-cover'/>
    </div>
  )
}

export default FLogo