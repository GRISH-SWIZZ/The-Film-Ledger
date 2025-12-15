import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const reviewService = {
    getReviewsByMovieId: async (movieId, filters = {}) => {
        const params = new URLSearchParams();
        params.append('status', filters.status || 'approved');
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.order) params.append('order', filters.order);

        const res = await axios.get(
            `${BASE_URL}/reviews/movie/${movieId}?${params.toString()}`
        );
        return res.data;
    },

    getReviewsByUserId: async (userId) => {
        const res = await axios.get(`${BASE_URL}/reviews/user/${userId}`);
        return res.data;
    },

    getAllReviews: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.movieId) params.append('movieId', filters.movieId);

        const res = await axios.get(
            `${BASE_URL}/reviews?${params.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                }
            }
        );
        return res.data;
    },

    addReview: async (reviewData) => {
        const res = await axios.post(
            `${BASE_URL}/reviews`,
            reviewData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return res.data;
    },

    updateReview: async (id, reviewData) => {
        const res = await axios.put(
            `${BASE_URL}/reviews/${id}`,
            reviewData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return res.data;
    },

    deleteReview: async (id) => {
        const token =
            localStorage.getItem('userToken') ||
            localStorage.getItem('adminToken');

        const res = await axios.delete(
            `${BASE_URL}/reviews/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return res.data;
    },

    approveReview: async (id) => {
        const res = await axios.put(
            `${BASE_URL}/reviews/${id}/approve`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                }
            }
        );
        return res.data;
    },

    rejectReview: async (id) => {
        const res = await axios.put(
            `${BASE_URL}/reviews/${id}/reject`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                }
            }
        );
        return res.data;
    }
};
