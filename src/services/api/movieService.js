import axios from "axios";

const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const movieService = {
    getAllMovies: async () => {
        const res = await axios.get(`${BASE_URL}/movies`);
        return res.data; // ✅ ARRAY
    },

    getMovieById: async (id) => {
        const res = await axios.get(`${BASE_URL}/movies/${id}`);
        return res.data;
    },

    createMovie: async (movie) => {
        const res = await axios.post(`${BASE_URL}/movies`, movie);
        return res.data;
    },

    updateMovie: async (id, movie) => {
        const res = await axios.put(`${BASE_URL}/movies/${id}`, movie);
        return res.data;
    },

    deleteMovie: async (id) => {
        await axios.delete(`${BASE_URL}/movies/${id}`);
    }
};
