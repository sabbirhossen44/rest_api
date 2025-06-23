import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const SampleNextArrow = (props) => {
  const { style, onClick } = props;
    return (
        <div
            className=" absolute top-[38%] right-10 bg-black/20 w-14 h-14 rounded-full z-10  cursor-pointer !flex items-center justify-center"
            style={{ ...style, }}
            onClick={onClick}
        >
            <FaArrowRight  className='text-xl text-white'/>
        </div>
    );
}

export default SampleNextArrow