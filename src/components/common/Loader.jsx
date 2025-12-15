import React from 'react';

const Loader = ({ fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-swiss-red rounded-full animate-spin mb-4"></div>
                    <p className="text-swiss-black font-bold tracking-widest text-sm uppercase">Loading</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center p-8">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-swiss-red rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
