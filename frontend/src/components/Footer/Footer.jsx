import React from 'react'
import Container from '../Layouts/Container'
import Flex from '../Layouts/Flex'
import FMenu from './FMenu'
import FShop from './FShop'
import FHelp from './FHelp'
import FContact from './FContact'
import FLogo from './FLogo'
import { FaFacebookF, FaLinkedinIn ,FaInstagram   } from "react-icons/fa6";


const Footer = () => {
    return (
        <>
            <div className='py-14 bg-[#F5F5F3]'>
                <Container>
                    <Flex className="justify-between">
                        <FMenu className="basis-[12%]"/>
                        <FShop className="basis-[12%]"/>
                        <FHelp className="basis-[12%]"/>
                        <FContact className="basis-[27%]"/>
                        <FLogo className="basis-[27%]"/>
                    </Flex>
                    <Flex className="justify-between items-center mt-10">
                        <div className="flex items-center gap-3 font-bold text-xl">
                            <FaFacebookF />
                            <FaLinkedinIn  />
                            <FaInstagram  />
                        </div>
                        <div className="">
                            <h3 className='text-sm text-secondary'>@2025 Orebi eCommerce Design & Develop by <span className='text-primary font-bold'>Sabbir Hossen</span></h3>
                        </div>
                    </Flex>
                </Container>
            </div>
        </>
    )
}

export default Footer