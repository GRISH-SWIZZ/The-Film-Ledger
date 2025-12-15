import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { movieService } from '@/services/api/movieService';
import MovieCard from '@/components/movie/MovieCard';
import Loader from '@/components/common/Loader';

const UserHome = () => {
    const { currentUser } = useAuth();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await movieService.getAllMovies();
                setMovies(res); // ✅ FIX HERE
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loader fullScreen />;

    return (
        <div className="min-h-screen pt-32 pb-16 bg-gray-50">
            <div className="container-custom">
                <div className="mb-16">
                    <h1 className="text-5xl font-bold mb-3 text-swiss-black">
                        Welcome back, {currentUser?.displayName?.split(' ')[0] || 'User'}.
                    </h1>
                    <p className="text-lg text-gray-600">
                        Pick up where you left off or discover something new.
                    </p>
                </div>

                <div className="mb-20">
                    <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-gray-200">
                        <h2 className="text-3xl font-bold text-swiss-black">
                            Recommended For You
                        </h2>
                        <Link
                            to="/explore"
                            className="text-swiss-red font-bold text-sm uppercase tracking-widest hover:underline transition-all"
                        >
                            View All →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {movies.slice(0, 4).map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-gray-200">
                        <h2 className="text-3xl font-bold text-swiss-black">
                            New Releases
                        </h2>
                        <Link
                            to="/explore"
                            className="text-swiss-red font-bold text-sm uppercase tracking-widest hover:underline transition-all"
                        >
                            View All →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {movies.slice(4, 8).map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
