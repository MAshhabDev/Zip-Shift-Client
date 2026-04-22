import React from 'react';

const Button = () => {
    return (
        <div>
            <div className='absolute bottom-[75px] left-[60px] flex gap-4'>
                <button className="btn rounded-full bg-primary border-none text-black px-6">
                    Track Your Parcel
                </button>

                <button className="btn btn-outline rounded-full px-6 text-black border-white">
                    Be A Rider
                </button>
            </div>
        </div>
    );
};

export default Button;