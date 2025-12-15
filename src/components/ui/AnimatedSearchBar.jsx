import React from 'react';

const AnimatedSearchBar = ({
    value,
    onChange,
    onSubmit,
    placeholder = "Search movies..."
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex items-center justify-center"
        >
            <div className="relative flex items-center justify-center group">

                {/* Animated gradient border – layer 1 */}
                <div
                    className="absolute inset-0 z-[-1] max-h-[70px] max-w-[400px] rounded-xl blur-[3px] overflow-hidden
                    before:absolute before:content-[''] before:z-[-1]
                    before:w-[999px] before:h-[999px] before:top-1/2 before:left-1/2
                    before:-translate-x-1/2 before:-translate-y-1/2
                    before:rotate-60 before:bg-no-repeat
                    before:bg-[conic-gradient(#000,#ff0000_5%,#000_38%,#000_50%,#ff0000_60%,#000_87%)]
                    before:transition-transform before:duration-[2000ms]
                    group-hover:before:rotate-[-120deg]
                    group-focus-within:before:rotate-[420deg]
                    group-focus-within:before:duration-[4000ms]"
                />

                {/* Animated gradient border – layer 2 */}
                <div
                    className="absolute inset-0 z-[-1] max-h-[65px] max-w-[398px] rounded-xl blur-[3px] overflow-hidden
                    before:absolute before:content-[''] before:z-[-1]
                    before:w-[600px] before:h-[600px] before:top-1/2 before:left-1/2
                    before:-translate-x-1/2 before:-translate-y-1/2
                    before:rotate-[82deg] before:bg-no-repeat
                    before:bg-[conic-gradient(rgba(0,0,0,0),#8b0000,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#8b0000,rgba(0,0,0,0)_60%)]
                    before:transition-transform before:duration-[2000ms]
                    group-hover:before:rotate-[-98deg]
                    group-focus-within:before:rotate-[442deg]
                    group-focus-within:before:duration-[4000ms]"
                />

                {/* Input wrapper */}
                <div className="relative">
                    <input
                        type="text"
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        className="w-[396px] h-[56px] rounded-lg bg-swiss-black px-[59px] text-base text-white
                        placeholder-gray-500 focus:outline-none"
                    />

                    {/* Fade mask */}
                    <div className="pointer-events-none absolute top-[18px] left-[70px] h-[20px] w-[100px]
                        bg-gradient-to-r from-transparent to-swiss-black
                        group-focus-within:hidden"
                    />

                    {/* Glow */}
                    <div className="pointer-events-none absolute top-[10px] left-[5px] h-[20px] w-[30px]
                        bg-swiss-red blur-2xl opacity-80 transition-all duration-[2000ms]
                        group-hover:opacity-0"
                    />

                    {/* Search icon */}
                    <div className="absolute left-5 top-[15px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" stroke="url(#search)" />
                            <line x1="22" y1="22" x2="16.65" y2="16.65" stroke="url(#searchl)" />
                            <defs>
                                <linearGradient id="search" gradientTransform="rotate(50)">
                                    <stop offset="0%" stopColor="#ff6b6b" />
                                    <stop offset="50%" stopColor="#ff0000" />
                                </linearGradient>
                                <linearGradient id="searchl">
                                    <stop offset="0%" stopColor="#ff0000" />
                                    <stop offset="50%" stopColor="#8b0000" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AnimatedSearchBar;
