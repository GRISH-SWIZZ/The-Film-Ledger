import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const Unauthorized = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-gray-100 p-8 rounded-full mb-8">
                <FaLock className="text-swiss-red text-6xl" />
            </div>
            <h1 className="text-6xl font-bold mb-4">403</h1>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Access Denied</h2>
            <p className="text-gray-500 max-w-md mb-10">
                You don't have permission to view this page. If you believe this is an error, please contact support.
            </p>
            <Link to="/" className="btn-primary">Go Home</Link>
        </div>
    );
};

export default Unauthorized;
