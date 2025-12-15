import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const useMovie = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const addToWatchlist = (movie) => {
        setWatchlist((prev) => [...prev, movie]);
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist((prev) => prev.filter(m => m.id !== movieId));
    };

    const toggleFavorite = (movie) => {
        if (favorites.some(m => m.id === movie.id)) {
            setFavorites(prev => prev.filter(m => m.id !== movie.id));
        } else {
            setFavorites(prev => [...prev, movie]);
        }
    };

    const value = {
        watchlist,
        favorites,
        addToWatchlist,
        removeFromWatchlist,
        toggleFavorite
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
