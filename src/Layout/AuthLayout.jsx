import React from 'react';
import Logo from '../Shared/Logo/Logo';

import image from '../assets/authImage.png'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo></Logo>
            <div className='flex'>
                <div className='flex-1'>


                </div>
                <div className='flex-1'>
                    <img src={image} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;