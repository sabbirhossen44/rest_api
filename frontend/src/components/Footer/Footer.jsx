import React from 'react'
import Container from '../Layouts/Container'
import Flex from '../Layouts/Flex'
import FMenu from './FMenu'
import FShop from './FShop'
import FHelp from './FHelp'
import FContact from './FContact'
import FLogo from './FLogo'
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <>
            <div className='py-14 bg-[#F5F5F3]'>
                <Container>
                    <div className="xl:hidden">
                        <div className="grid xl:grid-cols-4 grid-cols-2 gap-5">
                        <FLogo className=""/>
                        <FMenu className=""/>
                        <FShop className=""/>
                        <FHelp className=""/>
                        <FContact className=""/>
                    </div>
                    </div>
                    <div className="xl:block hidden">
                        <Flex className="justify-between">
                            <FMenu className="basis-[12%]" />
                            <FShop className="basis-[12%]" />
                            <FHelp className="basis-[12%]" />
                            <FContact className="basis-[27%]" />
                            <FLogo className="basis-[27%]" />
                        </Flex>
                    </div>
                    <Flex className="justify-between items-center mt-10 flex-col md:flex-row">
                        <div className="flex items-center gap-3 font-bold text-xl">
                            <FaFacebookF />
                            <FaLinkedinIn />
                            <FaInstagram />
                        </div>
                        <div className="text-center md:text-right">
                            <h3 className='text-sm text-secondary'>@2025 Orebi eCommerce Design & Develop by <Link to='/'><span className='text-primary font-bold'>Sabbir Hossen</span></Link></h3>
                        </div>
                    </Flex>
                </Container>
            </div>
        </>
    )
}

export default Footer