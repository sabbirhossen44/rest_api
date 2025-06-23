import React from 'react';
import Logo from '../../assets/logo.png';
import Flex from '../Layouts/Flex';
import Container from '../Layouts/Container';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            {/* <nav className='max-w-container mx-auto'> */}
            <Container>
                <div className=' py-8'>
                    {/* <div className="flex items-center"> */}
                    <Flex className="items-center">
                        <div className="w-1/4">
                            {/* <link to="">
                                <img src={Logo} alt="" />
                            </link> */}
                            <img src={Logo} alt="" />
                        </div>
                        <div className="w-3/4">
                            <ul className='flex justify-end gap-x-20 '>
                                <li className='text-[18px] text-primary hover:text-primary active:text-primary font-bold'><Link to="/">Home</Link></li>
                                <li className='text-[18px] text-[#767676] hover:text-primary active:text-primary font-bold'><Link to="/shop">Shop</Link></li>
                                <li className='text-[18px] text-[#767676] hover:text-primary active:text-primary font-bold'>About</li>
                                <li className='text-[18px] text-[#767676] hover:text-primary active:text-primary font-bold'>Contacts</li>
                                <li className='text-[18px] text-[#767676] hover:text-primary active:text-primary font-bold'>Journal</li>
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