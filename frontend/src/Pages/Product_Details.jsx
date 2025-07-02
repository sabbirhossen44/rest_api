import React, { useEffect, useState } from 'react'
import Container from '../components/Layouts/Container'
import Flex from '../components/Layouts/Flex'
import api from '../Http';
import PhotoSlider from '../components/Product Details/PhotoSlider'
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Layouts/Breadcrumbs';
import ProductInfo from '../components/Product Details/ProductInfo';

const Product_Details = () => {
    const { slug } = useParams();
    const [productData, setProductData] = useState(null);
    useEffect(() => {
        api.get(`/product_details/${slug}`).then(res => {
            setProductData(res.data);
        });

    }, [slug]);
    if (!productData) return <h2>Loading...</h2>;
    return (
        <>
            <div className="py-10">
                <Container>
                    <div className="pb-20">
                        <Breadcrumbs
                            title='Product'
                            link = '/shop'
                        />
                    </div>
                    <Flex className='gap-20'>
                        <div className='w-2/6'>
                            <PhotoSlider
                                items={productData}
                                galleries={productData.product_gallery}
                            />
                        </div>
                        <div className='w-4/6'>
                            <ProductInfo
                                data={productData}
                            />
                        </div>
                    </Flex>
                </Container>
            </div>
        </>
    )
}

export default Product_Details