import React, { useState } from 'react'
import Container from '../components/Layouts/Container'
import Breadcrumbs from '../components/Layouts/Breadcrumbs'
import Flex from '../components/Layouts/Flex'
import Pagination from '../components/Layouts/Pagination'
import LeftSidebar from '../components/Layouts/LeftSidebar'
import { useNavigate } from 'react-router-dom'

const Shop = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(12);
    const handelItemChange = (e) => {
        setShow(+e.target.value);
    }
    const handleSortChange = (e) => {
        const value = e.target.value;
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('sort', value);
        navigate(`/shop?${queryParams.toString()}`);
    }
    return (
        <>
            <div className="py-32">
                <Container>
                    <Breadcrumbs 
                        title='Product'
                        link = '/shop'
                    />
                    <Flex className="mt-32 gap-10">
                        <div className="w-1/4 shadow-xl p-3">
                            <LeftSidebar />
                        </div>
                        <div className="w-3/4">
                            <div className="flex items-center justify-end gap-x-10">
                                <div className="flex items-center gap-3">
                                    <div className="text-base font-medium text-secondary">Sort by:</div>
                                    <div className="w-[240px]">
                                        <select onChange={handleSortChange} id="countries" className="bg-gray-50 border border-gray-300 text-secondary text-base rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-2.5 ">
                                            <option className='text-secondary'>Choose a Option</option>
                                            <option value="1">Price Low To High</option>
                                            <option value="2">Price High To Low</option>
                                            <option value="3">Name (A-Z)</option>
                                            <option value="4">Name (Z-A)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-base font-medium text-secondary">Show:</div>
                                    <div className="w-[138px]">
                                        <select id="countries"
                                            onChange={(e) => handelItemChange(e)}
                                            className="bg-gray-50 border border-gray-300 text-secondary text-base rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-2.5 ">
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