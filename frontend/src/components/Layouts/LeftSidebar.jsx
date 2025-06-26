import React from 'react'
import LeftSidebarContent from './LeftSidebarContent'
import Category from '../Category/Category'
import Color from '../Color/Color'

const LeftSidebar = () => {
  return (
    <>
      <div className="">
        <Category/>
      </div>
      <div className="mt-10">
        <Color/>
      </div>

    </>
  )
}

export default LeftSidebar