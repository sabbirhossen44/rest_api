import React, { useEffect, useRef, useState } from 'react'
import Container from '../Layouts/Container'
import Flex from '../Layouts/Flex'
import { FaBarsStaggered } from "react-icons/fa6";
import Search from './Search';
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import Dropdown from '../Layouts/Dropdown';
import Cart from '../../assets/cart.png';
import { ImCross } from "react-icons/im";



const Header = () => {
    const ref = useRef();
    const userRef = useRef();
    const cartRef = useRef();
    const [show, setShow] = useState(false);
    const [userShow, setUserShow] = useState(false);
    const [cartrShow, setCartShow] = useState(false);
    useEffect(() => {
        document.body.addEventListener('click', (e) => {
            if (ref.current.contains(e.target)) {
                setShow(true);
            } else {
                setShow(false);
            }
            if (userRef.current.contains(e.target)) {
                setUserShow(true);
            } else {
                setUserShow(false);
            }
            if (cartRef.current.contains(e.target)) {
                setCartShow(true);
            } else {
                setCartShow(false);
            }
        })
    })
    return (
        <>
            <div className=" bg-[#F5F5F3] py-6">
                <Container>
                    <Flex className="justify-between items-center">
                        <Dropdown dropRef={ref} className="relative">
                            <div className="flex  cursor-pointer items-center gap-4 text-primary text-base">
                                <FaBarsStaggered />
                                Shop by Category
                            </div>
                            {show && (
                                <ul className='absolute z-50 top-[40px] w-[263px] bg-black text-white/70'>
                                    <li className='py-4 px-5 border-b-[1px] border-[#2D2D2D] hover:text-white hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white cursor-pointer'>Accesories</li>
                                    <li className='py-4 px-5 border-b-[1px] border-[#2D2D2D] hover:text-white hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white cursor-pointer'>Furniture</li>
                                    <li className='py-4 px-5 border-b-[1px] border-[#2D2D2D] hover:text-white hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white cursor-pointer'>Electronics</li>
                                    <li className='py-4 px-5 border-b-[1px] border-[#2D2D2D] hover:text-white hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white cursor-pointer'>Clothes</li>
                                    <li className='py-4 px-5 border-b-[1px] border-[#2D2D2D] hover:text-white hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white cursor-pointer'>Bags</li>
                                    <li className='py-4 px-5 border-b-[1px] border-[#2D2D2D] hover:text-white hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white cursor-pointer'>Home appliances</li>
                                </ul>
                            )}
                        </Dropdown>
                        <Search />
                        <div className="flex items-center gap-3 text-lg text-primary">
                            <Dropdown dropRef={userRef} className="relative">
                                <div className="flex cursor-pointer">
                                    <FaUser />
                                    <IoMdArrowDropdown />
                                </div>
                                {
                                    userShow && (
                                        <ul className='absolute z-50 top-[40px] right-0 w-[200px] text-primary bg-white shadow-md shadow-[#F5F5F3] text-center text-white/70'>
                                            <li className='py-4 px-5 border-b-[1px] text-primary active   hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white active:bg-primary  cursor-pointer'>My Account</li>
                                            <li className='py-4 px-5 border-b-[1px] text-primary   hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white active:bg-primary  cursor-pointer'>Log Out</li>

                                        </ul>
                                    )
                                }
                            </Dropdown>
                            <Dropdown dropRef={cartRef} className="relative">
                                <div className="cursor-pointer">
                                    <FaCartShopping />
                                </div>
                                {
                                    cartrShow && (
                                        <div className="w-[360px] z-50 absolute  top-[40px] right-0 bg-white shadow-md shadow-[#F5F5F3] text-primary">
                                            <Flex className="justify-between p-5 items-center  border-b-[1px] border-[#F5F5F3]">
                                                <div className="">
                                                    <img src={Cart} alt="" className='w-[80px] h-[80px] object-cover'/>
                                                </div>
                                                <div className="">
                                                    <h3 className='font-bold text-primary text-base'>Black Smart Watch</h3>
                                                    <p className='font-bold text-primary text-base'>$44.00</p>
                                                </div>
                                                <div className="">
                                                    <button><ImCross /></button>
                                                </div>
                                            </Flex>
                                            <Flex className="justify-between p-5 items-center  border-b-[1px] border-[#F5F5F3]">
                                                <div className="">
                                                    <img src={Cart} alt="" className='w-[80px] h-[80px] object-cover'/>
                                                </div>
                                                <div className="">
                                                    <h3 className='font-bold text-primary text-base'>Black Smart Watch</h3>
                                                    <p className='font-bold text-primary text-base'>$44.00</p>
                                                </div>
                                                <div className="">
                                                    <button><ImCross /></button>
                                                </div>
                                            </Flex>
                                            
                                            <div className="p-5">
                                                <h3 className='text-[#767676] text-base'>Subtotal: <span className='text-primary font-bold'>$44.00</span></h3>
                                                <div className="flex gap-5">
                                                    <button className='bg-transparent text-primary border ease-in duration-300 border-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md mt-3 w-full font-bold'>View Cart</button>
                                                    <button className='bg-transparent text-primary border ease-in duration-300 border-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md mt-3 w-full font-bold'>Checkout</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Dropdown>
                        </div>
                    </Flex>
                </Container>
            </div>

        </>
    )
}

export default Header