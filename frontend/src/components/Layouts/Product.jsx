import React from 'react'

import Badge from './Badge';
import { FaHeart } from "react-icons/fa6";
import { LuRefreshCw } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";



const Product = ({badge, product_img, product_name, product_price, product_wish ,product_compare, product_card, className}) => {
    return (
        <>
            <div className={`${className}`}>
                <div className="w-[370px] h-[370px] object-cover relative group overflow-y-hidden ease-in duration-400">
                    <img src={product_img} className='w-full h-full' alt="" />
                    {
                        badge && <Badge discount='10%'/>
                    }
                    <div className="absolute ease-in duration-300 left-0 top-full group-hover:top-1/2 w-full h-1/2 bg-white">
                        <div className="flex flex-col justify-between items-end p-7 h-full">
                            <div className="">
                                <button className='flex items-center gap-3 hover:font-bold text-secondary text-base font-medium hover:text-primary ease-in duration-300' value={product_wish}>Add to Wish List <span className='text-primary font-bold text-xl'><FaHeart /></span></button>
                            </div>
                            <div className="">
                                <button className='flex items-center gap-3 hover:font-bold text-secondary text-base font-medium hover:text-primary ease-in duration-300' value={product_compare}>Compare <span className='text-primary font-bold text-xl'><LuRefreshCw /></span></button>
                            </div>
                            <div className="">
                                <button className='flex items-center gap-3 hover:font-bold text-secondary text-base font-medium hover:text-primary ease-in duration-300' value={product_card}>Add to Cart <span className='text-primary font-bold text-xl'><FaShoppingCart /></span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-[360px] items-center mt-4">
                    <h3 >{product_name}</h3>
                    <span>{product_price}</span>
                </div>
            </div>
        </>
    )
}

export default Product