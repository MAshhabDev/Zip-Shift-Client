import React from 'react';

const services = [
    {
        "id": 1,
        "title": "Express & Standard Delivery",
        "description": "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        "highlight": false
    },
    {
        "id": 2,
        "title": "Nationwide Delivery",
        "description": "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        "highlight": true
    },
    {
        "id": 3,
        "title": "Fulfillment Solution",
        "description": "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        "highlight": false
    },
    {
        "id": 4,
        "title": "Cash on Home Delivery",
        "description": "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        "highlight": false
    },
    {
        "id": 5,
        "title": "Corporate Service / Contract In Logistics",
        "description": "Customized corporate services which includes warehouse and inventory management support.",
        "highlight": false
    },
    {
        "id": 6,
        "title": "Parcel Return",
        "description": "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        "highlight": false
    }
]

const ServiceSection = () => {
    return (
        <div className='bg-[#03373D] gap-[32px] rounded-lg'>
            <div className='text-accent mx-auto items-center  text-center pt-20' >
                <h2 className='text-2xl font-bold '>Our Services</h2>
                <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
            </div>
            <div className=" py-10 px-4 ">

                <div className="max-w-6xl mb-8 mx-auto text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {services.map((item) => (
                        <div
                            key={item.id}
                            className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition ${item.highlight ? "bg-lime-400" : "bg-white"
                                }`}

                        >
                        {/* icon */ }
                        < div className = "text-3xl mb-4" > { item.title }</div>

                {/* title */}
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {item.description}
                </h3>

                {/* description */}

            </div>
                    ))}

        </div>
            </div >
        </div >
    );
};

export default ServiceSection;