import React, { use } from 'react';
import BenefitCard from './BenefitCard';


const Benefit = ({ benefitPromise }) => {
    const benefits = use(benefitPromise)
    return (
        <div className='border-t border-b border-dashed border-[#03464D]/40 py-6 md:py-10'>
            <div className='py-8 px-8'>

                {
                    benefits.map(benefit => <BenefitCard key={benefit.id} benefit={benefit} > </BenefitCard>)
                }

            </div>
        </div>
    );
};

export default Benefit;