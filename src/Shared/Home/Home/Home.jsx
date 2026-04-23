import React from 'react';
import Banner from '../Banner/Banner';
import WorksSection from '../WorksSection/WorksSection';
import ServiceSection from '../ServiceSection/ServiceSection';
import Brand from '../Brand/Brand';
import Review from '../Review/Review';
import Benefit from '../Benefit/Benefit';

const reviewPromise = fetch("../../../../public/reviews.json").then(res => res.json())
const benefitPromise = fetch('/benefit.json').then(res => res.json())


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WorksSection></WorksSection>
            <ServiceSection></ServiceSection>
            <Brand></Brand>
            <Benefit benefitPromise={benefitPromise}></Benefit>
            <Review reviewPromise={reviewPromise}></Review>
        </div>
    );
};

export default Home;