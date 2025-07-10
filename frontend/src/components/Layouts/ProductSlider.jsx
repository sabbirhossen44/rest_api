import React from 'react'
import product_img from '../../assets/product.png';
import SampleNextArrow from './SampleNextArrow';
import SamplePrevArrow from './SamplePrevArrow';
import Product from './Product';
import Heading from './Heading'
import Slider from 'react-slick';
import Container from './Container';

const ProductSlider = ({ title, product }) => {
    var settings = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <div className="pt-28">
                <Container>
                    <Heading title={title} />
                    <div className="py-10">
                        <Slider {...settings}>
                            {
                                product ? product.map((data, index) => (
                                    <Product
                                        key={index}
                                        badge={data.discount ? true : false}
                                        discoutn={data.discount}
                                        product_img={data.photo}
                                        product_name={data.product_name}
                                        product_price={data.after_discount}
                                        product_wish={1}
                                        product_compare={1}
                                        slug={data.slug}
                                    />
                                ))
                                    :
                                    <Product
                                        badge={true}
                                        product_img={product_img}
                                        product_name={'Basic Crew Neck Tee'}
                                        product_price={'$44.00'}
                                        product_wish={1}
                                        product_compare={1}
                                        product_card={1}
                                    />

                            }
                        </Slider>
                    </div>
                </Container>
            </div>

        </>
    )
}

export default ProductSlider