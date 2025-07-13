import React, { useContext, useEffect, useRef, useState } from 'react'
import Container from '../Layouts/Container'
import Flex from '../Layouts/Flex'
import { FaBarsStaggered } from "react-icons/fa6";
import Search from './Search';
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import Dropdown from '../Layouts/Dropdown';
import api from '../../Http';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../Context/AdminAuth';
import { ToastContainer, toast } from 'react-toastify';
import CartHeader from '../Cart/CartHeader';



const Header = () => {
    const { user, logout, cart, fetchCart } = useContext(AdminAuthContext);
    const navigate = useNavigate();
    const ref = useRef();
    const userRef = useRef();
    const cartRef = useRef();
    const [show, setShow] = useState(false);
    const [userShow, setUserShow] = useState(false);
    const [cartrShow, setCartShow] = useState(false);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetchCart()
    })
    useEffect(() => {
        fetchCategory();

        document.body.addEventListener('click', (e) => {
            setShow(ref.current?.contains(e.target));
            setUserShow(userRef.current?.contains(e.target));
            setCartShow(cartRef.current?.contains(e.target));
        });
    }, []);

    const fetchCategory = async () => {
        const response = await api.get('/categorys');
        if (response.data.status) {
            setCategory(response.data.categories);
        }
    };

    const handleClick = (value) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('search', value);
        setShow(false);
        navigate(`/shop?${queryParams.toString()}`);
    };


    const handleLogout = () => {
        logout();
        toast.success('Logout Successfull')
        setUserShow(false);
        navigate('/login');
    };

    return (
        <>
            <ToastContainer />
            <div className=" bg-[#F5F5F3] py-6">
                <Container>
                    <Flex className="justify-between items-center">
                        <Dropdown dropRef={ref} className="relative">
                            <div className="flex  cursor-pointer items-center gap-4 text-primary text-base">
                                <FaBarsStaggered className='text-2xl'/>
                                <span className='hidden md:block'>Shop by Category</span>
                            </div>
                            {show && (
                                <ul className='absolute z-50 top-[40px] w-[263px] bg-black text-white/70'>
                                    {
                                        category && category.map((data, index) => (
                                            <li key={index} onClick={() => handleClick(data.id)} className='py-4 px-5 border-b-[1px] border-[#2D2D2D] hover:text-white hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white cursor-pointer' value={data.id}>{data.name}</li>
                                        ))
                                    }
                                </ul>
                            )}
                        </Dropdown>
                        <Search />
                        <div className="flex items-center gap-3 text-lg text-primary">
                            <Dropdown dropRef={userRef} className="relative">
                                <div className="flex cursor-pointer">
                                    <FaUser className='text-2xl'/>
                                    <IoMdArrowDropdown />
                                </div>
                                {
                                    userShow && (
                                        <ul className='absolute z-50 top-[40px] right-0 w-[200px] text-primary bg-white shadow-md shadow-[#F5F5F3] text-center text-white/70'>
                                            {
                                                user ?
                                                    <li onClick={() => { navigate('/admin/dashboard'); setUserShow(false); }} className='py-4 px-5 border-b-[1px] text-primary active   hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white active:bg-primary  cursor-pointer'>My Account</li>
                                                    :
                                                    <li onClick={() => { navigate('/login'); setUserShow(false); }} className='py-4 px-5 border-b-[1px] text-primary active   hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-white active:bg-primary  cursor-pointer'>Login</li>
                                            }
                                            <li onClick={handleLogout} className='py-4 px-5 border-b-[1px] text-primary active   hover:mx-2.5 ease-in duration-300 hover:font-bold active:bg-primary  cursor-pointer'>Logout</li>
                                        </ul>
                                    )
                                }
                            </Dropdown>
                            <Dropdown dropRef={user ? cartRef : null} className="relative">
                                <div className="cursor-pointer">
                                    <FaCartShopping className='text-2xl'/>
                                    <span className="absolute -top-3 -right-5 bg-slate-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {cart?.length || 0}
                                    </span>
                                </div>
                                {cartrShow && <CartHeader cart={cart} button={setUserShow} />}
                            </Dropdown>
                        </div>
                    </Flex>
                </Container>
            </div>

        </>
    )
}

export default Header