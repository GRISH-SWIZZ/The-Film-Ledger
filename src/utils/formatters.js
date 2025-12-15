/**
 * Utility functions for formatting data
 */

/**
 * Format date to readable string
 * @param {Date|String} date - Date to format
 * @returns {String} Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return 'N/A';
    
    const dateObj = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {Date|String} date - Date to format
 * @returns {String} Relative time string
 */
export const formatRelativeTime = (date) => {
    if (!date) return 'N/A';
    
    const dateObj = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formatDate(date);
};

/**
 * Format rating to display with star
 * @param {Number} rating - Rating value (1-5)
 * @returns {String} Formatted rating string
 */
export const formatRating = (rating) => {
    if (!rating || rating === 0) return 'Not rated';
    return `${rating.toFixed(1)} / 5`;
};

/**
 * Format duration in minutes to hours and minutes
 * @param {Number} minutes - Duration in minutes
 * @returns {String} Formatted duration string
 */
export const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
};

/**
 * Truncate text to specified length
 * @param {String} text - Text to truncate
 * @param {Number} maxLength - Maximum length
 * @returns {String} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
};

/**
 * Format review status to display text
 * @param {String} status - Review status
 * @returns {String} Formatted status text
 */
export const formatReviewStatus = (status) => {
    const statusMap = {
        'pending': 'Pending Review',
        'approved': 'Approved',
        'rejected': 'Rejected'
    };
    return statusMap[status] || status;
};

/**
 * Format user role to display text
 * @param {String} role - User role
 * @returns {String} Formatted role text
 */
export const formatUserRole = (role) => {
    const roleMap = {
        'user': 'User',
        'admin': 'Administrator'
    };
    return roleMap[role] || role;
};

/**
 * Format number with commas
 * @param {Number} number - Number to format
 * @returns {String} Formatted number string
 */
export const formatNumber = (number) => {
    if (!number) return '0';
    return number.toLocaleString('en-US');
};

/**
 * Get initials from name
 * @param {String} name - Full name
 * @returns {String} Initials
 */
export const getInitials = (name) => {
    if (!name) return '?';
    
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Validate email format
 * @param {String} email - Email to validate
 * @returns {Boolean} True if valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate rating value
 * @param {Number} rating - Rating to validate
 * @returns {Boolean} True if valid rating (1-5)
 */
export const isValidRating = (rating) => {
    return rating >= 1 && rating <= 5;
};