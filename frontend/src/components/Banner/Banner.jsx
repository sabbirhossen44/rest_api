import React, { useState } from 'react'
import Slider from "react-slick";
import Bannerimg from '../../assets/banner.png';
import { Link } from 'react-router-dom';

const Banner = () => {
    const [activeDot, setActiveDot] = useState(0);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (prev, next) => {
            setActiveDot(next);
        },
        appendDots: dots => (
            <div
                style={{
                    position: "absolute",
                    top: "38%",
                    left: "10%",
                }}
            >
                <ul style={{ margin: "0px" }}>
                    {dots.map((item) => {
                        return <li style={{ display: "block", marginTop: "14px" }}>{item}</li>
                    })}
                </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={
                    i === activeDot ?
                        {
                            width: "30px",
                            color: "#262626",
                            // background: "red",
                            borderRight: "3px #262626 solid",
                            fontSize: "16px",
                            padding: "0px 30px 10px 0"

                        }
                        :
                        {
                            width: "30px",
                            color: "#262626",
                            borderRight: "3px white solid",
                            fontSize: "16px",
                            padding: "0px 30px 10px 0"

                        }

                }
            >
                <span style={{ fontSize: "16px", }}>0</span>{i + 1}
            </div>
        )
    };
    return (
        <>
            <div className="">
                <Link to="/shop">
                    <Slider {...settings}>

                        <div className='w-full'>
                            <img src={Bannerimg} alt="" className='w-full h-[597px]' />
                        </div>

                        <div className='w-full'>
                            <Link to="/shop"><img src={Bannerimg} alt="" className='w-full h-[597px]' /></Link>
                        </div>
                        <div className='w-full'>
                            <Link to="/shop"><img src={Bannerimg} alt="" className='w-full h-[597px]' /></Link>
                        </div>


                    </Slider>
                </Link>
            </div>
        </>
    )
}

export default Banner