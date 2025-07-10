import React, { useEffect, useState } from 'react'
import ProductSlider from '../Layouts/ProductSlider';
import api from '../../Http'

const SpecialOffers = () => {
   const [product, setProduct] = useState([]);
    useEffect(()=>{
        const data = async() =>{
            const response = await api.get("/speciaOffers");
            setProduct(response.data.products);
        }
        data()
    })
    return (
        <>
            <ProductSlider
                title = 'Special Offers'
                product = {product}
            />
        </>
    )
}

export default SpecialOffers