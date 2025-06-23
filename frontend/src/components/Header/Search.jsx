import React from 'react'
import { FaSearch } from "react-icons/fa";

const Search = () => {
    return (
        <div className='w-[600px] bg-white flex justify-between  shadow-sm rounded-md items-center'>
            <div className="w-5/6">
                <input type="text" name="" id="" placeholder="Search Product" className="w-full text-pretty text-base outline-none bg-transparent py-4 ps-5"/>
            </div>
            <div className="">
                <button className='py-4 pe-5'><FaSearch /></button>
            </div>
        </div>
    )
}

export default Search