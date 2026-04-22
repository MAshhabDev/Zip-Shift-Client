import React from 'react';
import Banner from '../Banner/Banner';
import WorksSection from '../WorksSection/WorksSection';
import ServiceSection from '../ServiceSection/ServiceSection';
import Brand from '../Brand/Brand';
import Review from '../Review/Review';

const reviewPromise=fetch("../../../../public/reviews.json").then(res=>res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WorksSection></WorksSection>
            <ServiceSection></ServiceSection>
            <Brand></Brand>
            <Review reviewPromise={reviewPromise}></Review>
        </div>
    );
};

export default Home;