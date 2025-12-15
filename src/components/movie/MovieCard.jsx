import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="group block h-full">
            <div className="relative h-full border-2 border-gray-200 bg-white hover:border-swiss-black hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                    {/* Image Placeholder if url fails or is empty, handled by img onerror usually, but we assume mock data is fine */}
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ display: movie.poster_url ? 'none' : 'block' }}></div>
                    <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[0.3] group-hover:grayscale-0"
                    />
                    <div className="absolute top-3 right-3 bg-swiss-red text-white font-bold px-3 py-1.5 text-sm z-10 shadow-md">
                        {movie.rating}
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{movie.genre} • {movie.year}</div>
                    <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-swiss-red transition-colors line-clamp-2">{movie.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">{movie.description}</p>

                    <div className="mt-auto pt-4 border-t-2 border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-swiss-black group-hover:text-swiss-red group-hover:underline transition-colors">View Details →</span>
                        <div className="flex text-yellow-400 text-xs gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.floor(movie.rating) ? "text-swiss-black" : "text-gray-300"} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired
};

export default MovieCard;
