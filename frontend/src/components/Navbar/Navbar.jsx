import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import Flex from '../Layouts/Flex';
import Container from '../Layouts/Container';
import { Link, NavLink } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';


const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contacts', path: '/contact' },
    // { name: 'Journal', path: '' },
];

const baseClass = 'text-[18px] font-bold';
const activeClass = 'text-primary';
const inactiveClass = 'text-[#767676] hover:text-primary';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {/* <nav className='max-w-container mx-auto'> */}
            <Container>
                <div className=' py-8'>
                    {/* <div className="flex items-center"> */}
                    <Flex className="md:items-center">
                        <div className="md:w-1/4 w-1/4">
                            <Link to='/'>
                                <img src={Logo} alt="" className='md:w-auto w-full'/>
                            </Link>
                        </div>
                        <div className="w-3/4 hidden md:block">
                            <ul className='flex justify-end gap-x-20 '>
                                {links.map((link, i) => (
                                    <li key={i}>
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) =>
                                                `${baseClass} ${isActive ? activeClass : inactiveClass}`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden ml-auto">
                            <button onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? <HiX className="text-3xl" /> : <HiMenuAlt3 className="text-3xl" />}
                            </button>
                        </div>

                        {/* Mobile Menu Items */}
                        {isOpen && (
                            <div className="md:hidden absolute right-0 z-10 mt-14 bg-white px-10 py-5">
                                <ul className="flex flex-col gap-4">
                                    {links.map((link, i) => (
                                        <li key={i}>
                                            <NavLink
                                                to={link.path}
                                                onClick={() => setIsOpen(false)} 
                                                className={({ isActive }) =>
                                                    `${baseClass} ${isActive ? activeClass : inactiveClass} text-xl border-b border-spacing-1`
                                                }
                                            >
                                                {link.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Flex>
                </div>
            </Container>
            {/* </nav> */}
        </>
    )
}

export default Navbar