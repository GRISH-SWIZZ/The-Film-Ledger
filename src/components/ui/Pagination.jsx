import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// Helper function to generate visible page numbers with ellipsis (e.g., 1 2 ... 8 9 10)
const getPageNumbers = (currentPage, totalPages, maxVisibleButtons = 7) => {
    if (totalPages <= maxVisibleButtons) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const side = Math.floor((maxVisibleButtons - 3) / 2); // 3: start, end, ellipsis
    let startPage, endPage;

    if (currentPage <= side + 1) {
        // Near the beginning
        startPage = 1;
        endPage = maxVisibleButtons - 1;
    } else if (currentPage >= totalPages - side) {
        // Near the end
        startPage = totalPages - (maxVisibleButtons - 2);
        endPage = totalPages;
    } else {
        // Middle, showing ellipsis on both sides
        startPage = currentPage - side + 1;
        endPage = currentPage + side - 1;
    }

    const pages = [];

    // Always include page 1
    if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
            pages.push('...');
        }
    }

    // Include the main range
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    // Always include the last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pages.push('...');
        }
        pages.push(totalPages);
    }

    return Array.from(new Set(pages)); // Use Set to remove potential duplicates if logic overlaps slightly
};


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    // Common Button Style
    const baseButtonStyle = "w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-md transition-all duration-200 border";

    return (
        <div className="flex justify-center items-center gap-1 mt-12 select-none">

            {/* Prev Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                    ${baseButtonStyle}
                    px-4 
                    text-gray-600 border-gray-300
                    hover:text-swiss-red hover:border-swiss-red
                    disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
                `}
            >
                <FaAngleLeft className="mr-1" /> Prev
            </button>

            {/* Page Number Buttons */}
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-500">
                            ...
                        </span>
                    );
                }

                const pageNum = page;
                const isActive = currentPage === pageNum;

                return (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`
                            ${baseButtonStyle}
                            ${isActive
                                ? 'bg-swiss-red text-white border-swiss-red shadow-md'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                            }
                        `}
                    >
                        {pageNum}
                    </button>
                );
            })}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
                    ${baseButtonStyle}
                    px-4 
                    text-gray-600 border-gray-300
                    hover:text-swiss-red hover:border-swiss-red
                    disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
                `}
            >
                Next <FaAngleRight className="ml-1" />
            </button>
        </div>
    );
};

export default Pagination;