import React, { useEffect, useState } from 'react'
import ProductSlider from '../Layouts/ProductSlider';
import api from '../../Http'

const BestSale = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const data = async () => {
            const response = await api.get("/bestSale");
            setProduct(response.data.products);
        }
        data()
    })
    return (
        <>
            <ProductSlider
                title='Best Sale'
                product={product}
            />
        </>
    )
}

export default BestSale