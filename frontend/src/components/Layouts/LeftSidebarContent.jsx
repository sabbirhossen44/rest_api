import React, { useState } from 'react'
import Flex from './Flex'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


const LeftSidebarContent = ({ title, items, handleSidebar }) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="">
                <div className="cursor-pointer" onClick={() => setShow(!show)}>
                    <Flex className="justify-between items-center text-primary font-bold text-xl">
                        <div className="">{title}</div>
                        {
                            show ? <FaChevronUp /> : <FaChevronDown />

                        }
                    </Flex>

                </div>
                {
                    show &&
                    <div className="py-9">
                        <ul className='flex flex-col'>
                            {
                                items.map((item, index) => (
                                    <li
                                        key={index}
                                        value={item.id}
                                        onClick={() => handleSidebar(item.id)}
                                        className="py-4 px-5 border-b-[1px] border-slate-200 hover:text-primary text-secondary hover:mx-2.5 ease-in duration-300 hover:font-bold active:text-primary cursor-pointer"
                                    >
                                        {item.name || item.color_name}
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                }
            </div>
        </>
    )
}

export default LeftSidebarContent