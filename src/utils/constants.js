/**
 * Application Constants
 * 
 * These constants are used throughout the application for consistency
 */

// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    TIMEOUT: 10000, // 10 seconds
};

// Movie Genres
export const MOVIE_GENRES = [
    'Action',
    'Drama',
    'Comedy',
    'Sci-Fi',
    'Horror',
    'Thriller',
    'Romance',
    'Adventure',
    'Animation',
    'Documentary'
];

// Review Status
export const REVIEW_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

// User Roles
export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin'
};

// Rating Range
export const RATING = {
    MIN: 1,
    MAX: 5
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
};

// Sort Options
export const SORT_OPTIONS = {
    MOVIES: {
        TITLE_ASC: { sortBy: 'title', order: 'asc', label: 'Title (A-Z)' },
        TITLE_DESC: { sortBy: 'title', order: 'desc', label: 'Title (Z-A)' },
        YEAR_ASC: { sortBy: 'year', order: 'asc', label: 'Year (Oldest)' },
        YEAR_DESC: { sortBy: 'year', order: 'desc', label: 'Year (Newest)' },
        RATING_ASC: { sortBy: 'rating', order: 'asc', label: 'Rating (Low to High)' },
        RATING_DESC: { sortBy: 'rating', order: 'desc', label: 'Rating (High to Low)' }
    },
    REVIEWS: {
        DATE_ASC: { sortBy: 'date', order: 'asc', label: 'Date (Oldest)' },
        DATE_DESC: { sortBy: 'date', order: 'desc', label: 'Date (Newest)' },
        RATING_ASC: { sortBy: 'rating', order: 'asc', label: 'Rating (Low to High)' },
        RATING_DESC: { sortBy: 'rating', order: 'desc', label: 'Rating (High to Low)' }
    }
};

// Local Storage Keys
export const STORAGE_KEYS = {
    USER_TOKEN: 'userToken',
    ADMIN_TOKEN: 'adminToken',
    THEME: 'theme',
    LAST_VISITED: 'lastVisited'
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
    MOVIE_CREATED: 'Movie created successfully',
    MOVIE_UPDATED: 'Movie updated successfully',
    MOVIE_DELETED: 'Movie deleted successfully',
    REVIEW_SUBMITTED: 'Review submitted for moderation',
    REVIEW_UPDATED: 'Review updated successfully',
    REVIEW_DELETED: 'Review deleted successfully',
    REVIEW_APPROVED: 'Review approved',
    REVIEW_REJECTED: 'Review rejected',
    PROFILE_UPDATED: 'Profile updated successfully',
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logged out successfully'
};