import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { movieService } from "@/services/api/movieService";
import { reviewService } from "@/services/api/reviewService";
import Loader from "@/components/common/Loader";

import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();

    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const movieRes = await movieService.getMovieById(id);
                const reviewRes = await reviewService.getReviewsByMovieId(id);
                const allMovies = await movieService.getAllMovies();

                setMovie(movieRes);
                setReviews(reviewRes);

                const picks = allMovies
                    .filter(m => m.id !== movieRes.id)
                    .slice(0, 4);

                setRecommended(picks);
            } catch {
                toast.error("Failed to load movie details");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleReviewSubmit = async (reviewData) => {
        if (!currentUser) {
            toast.error("Login required to post a review");
            return;
        }

        try {
            const payload = {
                movieId: id,
                userId: currentUser.uid,
                userName: currentUser.displayName || "Anonymous",
                userPhoto: currentUser.photoURL || null,
                ...reviewData
            };

            const savedReview = await reviewService.addReview(payload);

            // add newly posted review to top
            setReviews(prev => [savedReview, ...prev]);

            setShowReviewForm(false);
            toast.success("Review submitted");
        } catch {
            toast.error("Failed to submit review");
        }
    };

    /* ================= TRAILER ================= */
    const trailerUrl = movie?.trailerUrl;

    const getTrailerUrl = (url) => {
        if (!url) return null;
        return url.includes("watch?v=")
            ? url.replace("watch?v=", "embed/")
            : url;
    };

    if (loading) return <Loader fullScreen />;
    if (!movie) return <div className="text-center py-20">Movie not found.</div>;

    return (
        <div className="relative text-white overflow-x-hidden">

            {/* ===== BACKGROUND TRAILER ===== */}
            {trailerUrl && (
                <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
                    <iframe
                        src={`${getTrailerUrl(trailerUrl)}?autoplay=1&mute=0&controls=0`}
                        title="Trailer Background"
                        className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh]
                                   -translate-x-1/2 -translate-y-1/2"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                </div>
            )}

            <div className="fixed inset-0 -z-20 bg-black/40 pointer-events-none" />


            {/* ===== HERO ===== */}
            <section className="relative min-h-screen flex items-center">
                <div className="container-custom grid grid-cols-1 md:grid-cols-[300px_1fr] gap-14 items-center">
                    <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-72 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.85)]"
                    />

                    <div className="max-w-3xl">
                        <h1 className="text-6xl font-extrabold text-swiss-red mb-6">
                            <span>{movie.title}</span>
                        </h1>

                        <p className="text-gray-200 text-lg mb-8">
                            {movie.description}
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm text-gray-200">
                            <span><strong>Genre:</strong> {movie.genre}</span>
                            <span><strong>Year:</strong> {movie.year}</span>
                            <span><strong>Duration:</strong> {movie.duration} mins</span>
                            <span><strong>Director:</strong> {movie.director}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CAST & CREW ===== */}
            <section className="relative z-20 pt-24">
                <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-swiss-red">Cast</h2>
                        <ul className="space-y-2 text-gray-200">
                            {movie.cast?.map((name, i) => (
                                <li key={i}>{name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-swiss-red">Crew</h2>
                        <ul className="space-y-2 text-gray-200">
                            {movie.crew &&
                                Object.entries(movie.crew).map(([role, name]) => (
                                    <li key={role}>
                                        <strong>{role}:</strong> {name}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </section>
            {/* ===== WHERE TO WATCH ===== */}
            {movie.watchProviders && movie.watchProviders.length > 0 && (
                <section className="relative z-20 pt-24">
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold mb-8 text-swiss-red">
                            Where to Watch
                        </h2>

                        <div className="flex flex-wrap gap-4">
                            {movie.watchProviders.map((provider, index) => (
                                <a
                                    key={index}
                                    href={provider.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                            px-6 py-3 rounded-full
                            bg-black text-white
                            border border-swiss-red
                            hover:bg-swiss-red
                            transition-colors
                            text-sm font-semibold
                        "
                                >
                                    {provider.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}


            {/* ===== REVIEWS SECTION ===== */}
            <section className="relative z-20 pt-24">
                <div className="container-custom">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-3xl font-bold text-swiss-red">Reviews</h2>
                        {currentUser && !showReviewForm && (
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="bg-swiss-red px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition"
                            >
                                Write a Review
                            </button>
                        )}
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <div className="bg-neutral-900/50 p-6 rounded-xl mb-10 border border-neutral-800">
                            <h3 className="text-xl font-bold mb-4">Post your review</h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const fd = new FormData(e.target);
                                    handleReviewSubmit({
                                        rating: Number(fd.get("rating")),
                                        comment: fd.get("comment"),
                                    });
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-bold mb-2">Rating</label>
                                    <select
                                        name="rating"
                                        className="bg-neutral-800 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-swiss-red"
                                    >
                                        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                                        <option value="4">⭐⭐⭐⭐ (4)</option>
                                        <option value="3">⭐⭐⭐ (3)</option>
                                        <option value="2">⭐⭐ (2)</option>
                                        <option value="1">⭐ (1)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Comment</label>
                                    <textarea
                                        name="comment"
                                        rows={4}
                                        className="w-full bg-neutral-800 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-swiss-red resize-none"
                                        placeholder="What did you think of the movie?"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="bg-swiss-red px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowReviewForm(false)}
                                        className="bg-transparent border border-gray-500 px-6 py-2 rounded-lg hover:border-white transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {reviews.length === 0 ? (
                            <p className="text-gray-400 italic">No reviews yet. Be the first!</p>
                        ) : (
                            reviews.map((r, i) => (
                                <div key={i} className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-800">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-swiss-red flex items-center justify-center font-bold text-white uppercase">
                                            {r.userName ? r.userName[0] : "A"}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{r.userName}</h4>
                                            <div className="text-yellow-500 text-sm">
                                                {"⭐".repeat(r.rating)}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        {r.comment}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>




            {/* ===== RECOMMENDED ===== */}
            <section className="relative z-20 pt-32 pb-32">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold mb-10 text-swiss-red">
                        Recommended Movies
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {recommended.map(m => (
                            <Link key={m.id} to={`/movie/${m.id}`} className="group">
                                <img
                                    src={m.poster_url}
                                    alt={m.title}
                                    className="rounded-xl shadow-lg group-hover:scale-105 transition"
                                />
                                <p className="mt-3 text-sm font-semibold">
                                    {m.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MovieDetailsPage;
