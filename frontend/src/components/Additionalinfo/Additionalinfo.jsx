
import React from 'react'
import Container from '../Layouts/Container';
import Flex from '../Layouts/Flex';
import { PiNumberTwoBold } from "react-icons/pi";
import { MdLocalShipping } from "react-icons/md";
import { GrRefresh } from "react-icons/gr";




const Additionalinfo = () => {
  return (
    <>
        <div className="py-7 mt-[-15px] bg-[#F0F0F0] shadow-md">
            <Container>
                <Flex className="justify-between">
                    <div className="flex items-center gap-x-2">
                        <span className='font-bold text-2xl'> <PiNumberTwoBold /></span>
                        <h3 className='text-secondary text-base'>Two years warranty</h3>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span className='font-bold text-2xl'><MdLocalShipping /></span>
                        <h3 className='text-secondary text-base'>Free shipping</h3>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span className='font-bold text-2xl'> <GrRefresh /></span>
                        <h3 className='text-secondary text-base'>Return policy in 30 days</h3>
                    </div>
                </Flex>
            </Container>
        </div>
    </>
  )
}

export default Additionalinfo