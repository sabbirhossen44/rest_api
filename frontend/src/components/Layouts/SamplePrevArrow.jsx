import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

const SamplePrevArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className=" absolute top-[38%] left-2 bg-black/20 w-14 h-14 rounded-full z-10  cursor-pointer !flex items-center justify-center"
            style={{ ...style, }}
            onClick={onClick}
        >
            <FaArrowLeft className='text-xl text-white' />
        </div>
    );
}

export default SamplePrevArrow