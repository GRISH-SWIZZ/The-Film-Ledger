import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDebounce } from '@/hooks/useFetch';

const SearchBar = ({ onSearch, placeholder = "Search...", autoFocus = false }) => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);

    return (
        <div className="relative w-full">
            <input
                type="text"
                className="w-full pl-12 pr-10 py-4 bg-gray-50 border-b-2 border-gray-200 focus:border-swiss-red focus:bg-white outline-none transition-all text-lg font-medium placeholder-gray-400"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus={autoFocus}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            {query && (
                <button
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-swiss-black"
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
