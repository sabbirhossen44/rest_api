import React from 'react';
import Logo from '../../assets/logo.png';
import Flex from '../Layouts/Flex';
import Container from '../Layouts/Container';
import { Link, NavLink } from 'react-router-dom';


const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '' },
    { name: 'Contacts', path: '' },
    { name: 'Journal', path: '' },
];

const baseClass = 'text-[18px] font-bold';
const activeClass = 'text-primary';
const inactiveClass = 'text-[#767676] hover:text-primary';

const Navbar = () => {
    return (
        <>
            {/* <nav className='max-w-container mx-auto'> */}
            <Container>
                <div className=' py-8'>
                    {/* <div className="flex items-center"> */}
                    <Flex className="items-center">
                        <div className="w-1/4">
                            <Link to='/'>
                                <img src={Logo} alt="" />
                            </Link>
                        </div>
                        <div className="w-3/4">
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
                        {/* </div> */}
                    </Flex>
                </div>
            </Container>
            {/* </nav> */}
        </>
    )
}

export default Navbar