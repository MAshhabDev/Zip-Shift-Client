import React from 'react';
import Banner from '../Banner/Banner';
import WorksSection from '../WorksSection/WorksSection';
import ServiceSection from '../ServiceSection/ServiceSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WorksSection></WorksSection>
            <ServiceSection></ServiceSection>
        </div>
    );
};

export default Home;