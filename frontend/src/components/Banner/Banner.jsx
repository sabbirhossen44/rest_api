import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Bannerimg from '../../assets/banner.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Banner = () => {
    const [activeDot, setActiveDot] = useState(0);
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        fetchBanner();
    }, []);
    const fetchBanner = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/banner`);
            if (response && response.data.status === true) {
                setBanners(response.data.banners);
            }
        } catch (error) {
            console.error("User load error:", error);
        }
    }
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
                        {
                            banners.map((banner) => (
                                <div className='w-full'>
                                    <Link to="/shop"> <img src={banner.photo_path} alt="" className='w-full h-[597px]' /></Link>
                                </div>
                            ))
                        }
                       

                    </Slider>
                </Link>
            </div>
        </>
    )
}

export default Banner