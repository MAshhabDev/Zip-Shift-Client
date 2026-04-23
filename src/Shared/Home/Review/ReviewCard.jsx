import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {

    const { userName, review: reviews, user_photoURL } = review;
    return (
        <div>
            <div className="card max-w-sm bg-[#F3F3F3] rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="text-[#C7E3E6] text-6xl font-bold leading-none mb-6">
                    "
                </div>

                <p className="text-gray-600 text-[18px]  mb-8">
                    {reviews}
                </p>

                <div className="border-t-2 border-dashed border-[#6C9AA0] pt-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#005B66]">
                        <img src={user_photoURL} alt="" />
                    </div>

                    <div>
                        <h3 className="text-[#0A4B53] text-2xl font-bold leading-tight">
                            {userName}
                        </h3>

                        <p className="text-gray-500 text-lg">Senior Product Designer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;