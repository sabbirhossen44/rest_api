import React, { useEffect, useState } from 'react'
import Container from '../components/Layouts/Container'
import Flex from '../components/Layouts/Flex'
import api from '../Http';
import PhotoSlider from '../components/Product Details/PhotoSlider'
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Layouts/Breadcrumbs';
import ProductInfo from '../components/Product Details/ProductInfo';
import Description from '../components/Description/Description';
import Reviews from '../components/Reviews/Reviews';
import ProductAddiInfo from '../components/ProductAddiInfo/ProductAddiInfo';

const Product_Details = () => {
    const { slug } = useParams();
    const [productData, setProductData] = useState(null);
    const [info, setInfo] = useState(1);
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
                            link='/shop'
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
                    <div className="py-20">
                        <div className="py-5 border-b-2 border-t-2 flex justify-center gap-10 text-xl">
                            <div className="cursor-pointer font-bold text-secondary" onClick={() => setInfo(1)}>Description</div>
                            <div className="cursor-pointer font-bold text-secondary" onClick={() => setInfo(2)}>Reviews</div>
                            <div className="cursor-pointer font-bold text-secondary" onClick={() => setInfo(3)}>Additional info</div>
                        </div>

                        <div className="mt-5">
                            {
                                info == 1 &&
                                <Description
                                    productData={productData}
                                />
                            }
                            {
                                info == 2 &&
                                <Reviews
                                    productData={productData}
                                />
                            }
                            {
                                info == 3 &&
                                <ProductAddiInfo
                                    productData={productData}
                                />
                            }
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Product_Details