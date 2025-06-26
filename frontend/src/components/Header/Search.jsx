import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const hendelSearch = () => {
        navigate(`/shop?search=${searchText}`)
    }
    return (
        <div className='w-[600px] bg-white flex justify-between  shadow-sm rounded-md items-center'>
            <div className="w-5/6">
                <input
                    value={searchText}
                    onChange={(e) =>  setSearchText(e.target.value)}
                    type="text" name="" id="" placeholder={search ? search : 'Search Product'} className="w-full text-pretty text-base outline-none bg-transparent py-4 ps-5" />
            </div>
            <div className="">
                <button className='py-4 pe-5' onClick={hendelSearch}><FaSearch /></button>
            </div>
        </div>
    )
}

export default Search