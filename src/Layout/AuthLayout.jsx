import React from 'react';
import { Outlet } from 'react-router';
import image from '../assets/authImage.png';
import Logo from '../Shared/Logo/Logo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto py-4 md:py-6">
                <div className="mb-6 md:mb-8">
                    <Logo />
                </div>

                <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
                    <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">

                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="w-full max-w-md">
                                <Outlet />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 hidden md:flex justify-center">
                            <img
                                src={image}
                                alt="auth"
                                className="w-full max-w-sm lg:max-w-md object-contain"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;