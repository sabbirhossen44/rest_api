import React, { useState } from 'react'
import Flex from './Flex'
import { FaChevronDown } from "react-icons/fa";


const LeftSidebarContent = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="">
                <Flex className="justify-between items-center">
                    <div className="" onClick={()=> setShow(!show)}>Shop by Category</div>
                    <FaChevronDown />
                </Flex>
                {
                    show &&
                    <div className="">
                        <p>kdsfka</p>
                        <p>kdsfka</p>
                        <p>kdsfka</p>
                        <p>kdsfka</p>
                        <p>kdsfka</p>
                        <p>kdsfka</p>
                        <p>kdsfka</p>
                    </div>
                }
            </div>
        </>
    )
}

export default LeftSidebarContent