import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/banner/banner1.png'
import img2 from '../../../assets/banner/banner2.png'
import img3 from '../../../assets/banner/banner3.png'
import Button from './Button';

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true}>
            <div className='relative'>
                <img src={img1} />
                <Button></Button>
            </div>
            <div>
                <img src={img2} />
                <Button></Button>
            </div>
            <div>
                <img src={img3} />
                <Button></Button>
            </div>
        </Carousel>
    );
};

export default Banner;