import React, { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const FilterPanel = ({ filters, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Mock options
    const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller"];
    const years = ["2024", "2023", "2022", "2021", "2020", "Classic"];

    const toggleFilter = (type, value) => {
        // Logic to update filter state
        onFilterChange({ type, value });
    };

    return (
        <>
            <button
                className="md:hidden fixed bottom-6 right-6 z-40 bg-swiss-black text-white p-4 rounded-full shadow-xl"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaFilter />
            </button>

            <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:static md:transform-none md:shadow-none md:w-64 md:block ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 h-full overflow-y-auto">
                    <div className="flex justify-between items-center mb-8 md:hidden">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <button onClick={() => setIsOpen(false)}><FaTimes /></button>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-sm uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Genre</h3>
                        <div className="space-y-2">
                            {genres.map(genre => (
                                <label key={genre} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 border-2 border-gray-300 checked:bg-swiss-red rounded-none focus:ring-0" />
                                    <span className="text-gray-600 group-hover:text-swiss-black transition-colors">{genre}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-sm uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Year</h3>
                        <div className="space-y-2">
                            {years.map(year => (
                                <label key={year} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 border-2 border-gray-300 checked:bg-swiss-red rounded-none focus:ring-0" />
                                    <span className="text-gray-600 group-hover:text-swiss-black transition-colors">{year}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className="w-full btn-outline md:hidden">Apply Filters</button>
                </div>
            </div>

            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>}
        </>
    );
};

export default FilterPanel;
