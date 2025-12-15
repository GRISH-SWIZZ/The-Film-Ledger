import React, { useState, useEffect } from 'react';
import { movieService } from '@/services/api/movieService';
import MovieCard from '@/components/movie/MovieCard';
import Loader from '@/components/common/Loader';
import AnimatedSearchBar from '@/components/ui/AnimatedSearchBar';
import { FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ExplorePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await movieService.getAllMovies();
                setMovies(response);
            } catch {
                toast.error("Failed to load movies");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const filteredMovies = movies.filter((movie) =>
        movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-32 bg-white min-h-screen">
            <div className="container-custom">
                <div className="flex flex-col items-center mb-16 gap-8">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-3 text-swiss-black">
                            Explore Movies
                        </h1>
                        <p className="text-lg text-gray-600">
                            Find your next favorite.
                        </p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <AnimatedSearchBar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Search by title or genre..."
                        />
                        <button
                            onClick={() => toast.info("Filters coming soon")}
                            className="p-4 border-2 border-swiss-black hover:bg-swiss-black hover:text-white transition-colors rounded-lg"
                        >
                            <FaFilter size={20} />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                            {filteredMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        {filteredMovies.length === 0 && (
                            <div className="text-center py-32">
                                <h3 className="text-2xl font-bold text-gray-400">
                                    No movies match "{searchTerm}"
                                </h3>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
