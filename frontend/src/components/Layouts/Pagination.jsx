import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Product from '../Layouts/Product'
import Flex from './Flex';
import { useLocation } from 'react-router-dom';
import api from '../../Http';

function Items({ currentItems }) {

    return (
        <>
            {currentItems &&
                currentItems.map((item, index) => (
                    <div key={index}>
                        <Product
                            className="mt-10"
                            badge={item.discount ? true : false}
                            discoutn={item.discount}
                            product_img={item.photo}
                            product_name={item.product_name}
                            product_price={`${item.after_discount}`}
                            slug = {item.slug}
                        />


                    </div>
                ))}
        </>
    );
}

const Pagination = ({ itemsPerPage }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [items, setItems] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const categoryID = queryParams.get('category');
    const search = queryParams.get('search');
    const color = queryParams.get('color');
    const brand = queryParams.get('brand');
    const sort = queryParams.get('sort');
    useEffect(() => {
        const fetchProducts = async () => {
            let url = `/products`
            const params = [];
            if (categoryID && categoryID !== 'undefined') {
                params.push(`category=${categoryID}`)
            }
            if (search && search !== 'undefined') {
                params.push(`search=${search}`)
            }
            if (color && color !== 'undefined') {
                params.push(`color=${color}`)
            }
            if (brand && brand !== 'undefined') {
                params.push(`brand=${brand}`)
            }
            if (sort && sort !== 'undefined') {
                params.push(`sort=${sort}`)
            }

            if (params.length > 0) {
                url += `?${params.join('&')}`;
            }
            try {
                const response = await api.get(url);
                if (response.data.status == true) {
                    setItems(response.data.products);
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, [categoryID, search, color ,brand ,sort]);


    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
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