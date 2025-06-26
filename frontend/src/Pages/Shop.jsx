import React, { useState } from 'react'
import Container from '../components/Layouts/Container'
import Breadcrumbs from '../components/Layouts/Breadcrumbs'
import Flex from '../components/Layouts/Flex'
import Pagination from '../components/Layouts/Pagination'
import LeftSidebar from '../components/Layouts/LeftSidebar'

const Shop = () => {
    const [show, setShow] = useState(12);
    const handelItemChange =(e)=>{
        setShow(+e.target.value);
    }
    return (
        <>
            <div className="py-32">
                <Container>
                    <Breadcrumbs />
                    <Flex className="mt-32 gap-10">
                        <div className="w-1/4 shadow-xl p-3">
                            <LeftSidebar/>
                        </div>
                        <div className="w-3/4">
                            <div className="flex items-center justify-end gap-x-10">
                                <div className="flex items-center gap-3">
                                    <div className="text-base font-medium text-secondary">Sort by:</div>
                                    <div className="w-[240px]">
                                        <select id="countries" class="bg-gray-50 border border-gray-300 text-secondary text-base rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-2.5 ">
                                            <option selected className='text-secondary'>Choose a country</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-base font-medium text-secondary">Show:</div>
                                    <div className="w-[138px]">
                                        <select id="countries"
                                            onChange={(e)=>handelItemChange(e)}
                                            class="bg-gray-50 border border-gray-300 text-secondary text-base rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-2.5 ">
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="36">36</option>
                                            <option value="48">48</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <Pagination itemsPerPage={show} />
                        </div>
                    </Flex>
                </Container>
            </div>
        </>
    )
}

export default Shop