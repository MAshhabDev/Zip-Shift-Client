import React from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="text-center bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">

                <FaLock className="text-red-500 text-6xl mx-auto mb-4" />

                <h1 className="text-4xl font-bold text-red-600 mb-2">
                    403 Forbidden
                </h1>

                <p className="text-gray-600 mb-6">
                    You don't have permission to access this page.
                </p>

                <Link to="/">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition">
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;