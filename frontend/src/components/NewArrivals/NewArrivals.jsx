import React from 'react'
import Container from '../Layouts/Container'
import Heading from '../Layouts/Heading'
import Product from '../Layouts/Product'
import Slider from "react-slick";
import SamplePrevArrow from '../Layouts/SamplePrevArrow';
import SampleNextArrow from '../Layouts/SampleNextArrow';
import product_img from '../../assets/product.png';


const NewArrivals = () => {
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
            <div className="pt-32">
                <Container>
                    <Heading title="New Arrivals" />
                    <div className="py-10">
                        <Slider {...settings}>
                            <Product
                                badge={true}
                                product_img={product_img}
                                product_name={'Basic Crew Neck Tee'}
                                product_price={'$44.00'}
                                product_wish = {1}
                                product_compare = {1}
                                product_card = {1}
                            />
                            <Product
                                badge={true}
                                product_img={product_img}
                                product_name={'Basic Crew Neck Tee'}
                                product_price={'$44.00'}
                                product_wish = {1}
                                product_compare = {1}
                                product_card = {1}
                            />
                            <Product
                                badge={true}
                                product_img={product_img}
                                product_name={'Basic Crew Neck Tee'}
                                product_price={'$44.00'}
                                product_wish = {1}
                                product_compare = {1}
                                product_card = {1}
                            />
                            <Product
                                badge={true}
                                product_img={product_img}
                                product_name={'Basic Crew Neck Tee'}
                                product_price={'$44.00'}
                                product_wish = {1}
                                product_compare = {1}
                                product_card = {1}
                            />
                            <Product
                                badge={true}
                                product_img={product_img}
                                product_name={'Basic Crew Neck Tee'}
                                product_price={'$44.00'}
                                product_wish = {1}
                                product_compare = {1}
                                product_card = {1}
                            />
                            <Product
                                badge={true}
                                product_img={product_img}
                                product_name={'Basic Crew Neck Tee'}
                                product_price={'$44.00'}
                                product_wish = {1}
                                product_compare = {1}
                                product_card = {1}
                            />
                        </Slider>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default NewArrivals