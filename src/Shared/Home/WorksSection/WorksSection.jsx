import React from 'react';

const services = [
    {
        id: 1,
        title: "Booking Pick & Drop",
        description:
            "From personal packages to business shipments — we deliver on time, every time.",
        icon: "🚚",
    },
    {
        id: 2,
        title: "Cash On Delivery",
        description:
            "From personal packages to business shipments — we deliver on time, every time.",
        icon: "💵",
    },
    {
        id: 3,
        title: "Delivery Hub",
        description:
            "From personal packages to business shipments — we deliver on time, every time.",
        icon: "📦",
    },
    {
        id: 4,
        title: "Booking SME & Corporate",
        description:
            "From personal packages to business shipments — we deliver on time, every time.",
        icon: "🏢",
    },
];

const WorksSection = () => {
    return (
        <div>

            <div className="bg-gray-100 py-10 px-4">
                <h2 className='text-2xl font-bold ml-20 '>How it Works</h2>

                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {services.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            {/* icon */}
                            <div className="text-3xl mb-4">{item.icon}</div>

                            {/* title */}
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                {item.title}
                            </h3>

                            {/* description */}
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default WorksSection;