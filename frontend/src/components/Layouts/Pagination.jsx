import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import product_img from '../../assets/product.png';
import Product from '../Layouts/Product'
import Flex from './Flex';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map(() => (
                    <div>
                        <Product
                            className="mt-10"
                            badge={true}
                            product_img={product_img}
                            product_name={'Basic Crew Neck Tee'}
                            product_price={'$44.00'}
                            product_wish={1}
                            product_compare={1}
                            product_card={1}
                        />
                        
                    </div>
                ))}
        </>
    );
}

const Pagination = ({ itemsPerPage }) => {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    return (
        <>
            <Flex className="justify-between flex-wrap">
                <Items currentItems={currentItems} />
            </Flex>
            <Flex className="justify-between items-center mt-10">
                <ReactPaginate
                breakLabel="..."
                nextLabel=""
                pageClassName="text-primary"
                pageLinkClassName="inline-block border active:text-white border-[#fofofo] px-3.5 py-2.5 text-sm  hover:bg-primary hover:text-white"
                previousClassName="page-item"
                // pageRangeDisplayed="page-item"
                previousLinkClassName="page-link"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="flex gap-x-4"
                activeClassName="bg-primary text-white"
                previousLabel=""
                renderOnZeroPageCount={null}
            />
            <p>Products to {itemOffset + itemsPerPage} of {items.length}</p>
            </Flex>
        </>
    )
}

export default Pagination