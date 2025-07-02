import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


const PhotoSlider = ({ items, galleries }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                    <img src={items.product.photo} />
                </SwiperSlide>

                {
                    galleries && galleries.map((gallery) => (
                        <SwiperSlide>
                            <img src={gallery.gallery} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                navigation={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={items.product.photo} />
                </SwiperSlide>
                {
                    galleries && galleries.map((gallery) => (
                        <SwiperSlide>
                            <img src={gallery.gallery} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    )
}

export default PhotoSlider