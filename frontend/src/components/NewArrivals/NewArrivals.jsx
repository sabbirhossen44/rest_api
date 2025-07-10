import React, { useEffect, useState } from 'react'
import ProductSlider from '../Layouts/ProductSlider';
import api from '../../Http';

const NewArrivals = () => {
    const [product, setProduct] = useState([]);
    useEffect(()=>{
        const data = async() =>{
            const response = await api.get("/newProduct");
            setProduct(response.data.products);
        }
        data()
    })
    return (
        <>
            <ProductSlider
                title = 'New Arrivals'
                product = {product}
            />
        </>
    )
}

export default NewArrivals