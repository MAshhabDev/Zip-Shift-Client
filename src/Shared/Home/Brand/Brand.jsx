import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import img1 from "../../../assets/brands/amazon.png"
import img2 from "../../../assets/brands/amazon.png"
import img3 from "../../../assets/brands/amazon.png"
import img4 from "../../../assets/brands/amazon.png"
import img5 from "../../../assets/brands/amazon.png"
import img6 from "../../../assets/brands/amazon.png"
import img7 from "../../../assets/brands/casio.png"
import { Autoplay } from 'swiper/modules';

const brandLogs = [img1, img2, img3, img4, img5, img6, img7]


const Brand = () => {
    return (
        <div className='mt-20 mb-10'>


            <Swiper
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
            >
                {
                    brandLogs.map((logo, index) => <SwiperSlide key={index}><img src={logo} alt="" /></SwiperSlide>
                    )
                }

            </Swiper>
        </div>
    );
};

export default Brand;