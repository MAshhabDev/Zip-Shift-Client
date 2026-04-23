import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Review = ({ reviewPromise }) => {

    const reviews = use(reviewPromise)
    return (
        <div className='my-24'>

            <div className='text-center mb-5'>
                <h2 className='font-bold text-2xl color-[#03373D] mb-2 my-5'>What our customers are sayings</h2>
                <p className='font-sans'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper <br />
                    alignment, reduce pain, and strengthen your body with ease!</p>
            </div>

            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >

                {
                    reviews.map(review => <SwiperSlide key={review.id}>
                        <ReviewCard review={review}></ReviewCard>
                    </SwiperSlide>)
                }

            </Swiper>


        </div>
    );
};

export default Review;