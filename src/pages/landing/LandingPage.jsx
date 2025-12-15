import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaArrowRight,
    FaFilm,
    FaUsers,
    FaCommentAlt,
    FaPlay
} from "react-icons/fa";

import { movieService } from "@/services/api/movieService";
import MovieCard from "@/components/movie/MovieCard";
import Loader from "@/components/common/Loader";
import { BackgroundPaths } from "@/components/ui/BackgroundPaths";
import KollywoodShowcase from "@/components/landing/KollywoodShowcase";

const sectionAnim = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 }
};

const LandingPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await movieService.getAllMovies();
                setMovies(res.slice(0, 4));
            } catch (err) {
                console.error("Landing movies fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="flex flex-col overflow-x-hidden">

            {/* ================= HERO ================= */}
            <section className="relative w-full">
                <BackgroundPaths title="DISCOVER · REVIEW · INFLUENCE">

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-10 items-center"
                    >
                        {/* LEFT — TEXT CONTENT */}
                        <div className="flex flex-col gap-10 text-left">
                            <p className="text-xl md:text-2xl text-swiss-black max-w-xl bg-white/85 backdrop-blur-md p-8 rounded-3xl shadow-sm">
                                A modern platform built for exploring movies, sharing opinions,
                                and shaping cinematic conversations.
                                <span className="block mt-3 font-semibold">
                                    Crafted for real film lovers.
                                </span>
                            </p>

                            <div>
                                <Link
                                    to="/auth"
                                    className="btn-primary px-8 py-2 rounded-full text-lg font-bold shadow-xl inline-flex items-center gap-3"
                                >
                                    JOIN NOW <FaArrowRight />
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT — 2x2 LIVE GRID */}
                        {/* RIGHT — UPCOMING MOVIES */}
                        <div className="flex flex-col gap-4">

                            <h3 className="text-2xl font-extrabold text-swiss-black">
                                Upcoming Movies
                            </h3>

                            <div className="columns-2 gap-6 space-y-6">
                                {["karrupu.jpg", "Jailer2.jpg", "jn.jpg", "parasakthi.jpg"].map((img, index) => (
                                    <div
                                        key={index}
                                        className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg group"
                                    >
                                        <img
                                            src={`/hero/${img}`}
                                            alt="movie"
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>

                </BackgroundPaths>
            </section>

            {/* ================= FEATURES ================= */}
            <motion.section
                className="py-32 bg-swiss-black text-white"
                variants={sectionAnim}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container-custom">
                    <h2 className="text-5xl font-extrabold mb-20 text-center">
                        <span className="text-swiss-red">Why Film Ledger</span>?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
                        <div className="space-y-6">
                            <FaFilm className="text-swiss-red text-6xl mx-auto" />
                            <h3 className="text-3xl font-bold">Explore Movies</h3>
                            <p className="text-gray-300 text-lg">
                                Discover movies with rich details, cast, crew, trailers,
                                and curated browsing.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <FaCommentAlt className="text-swiss-red text-6xl mx-auto" />
                            <h3 className="text-3xl font-bold">Write Reviews</h3>
                            <p className="text-gray-300 text-lg">
                                Share opinions, discuss stories, and influence how films
                                are perceived.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <FaUsers className="text-swiss-red text-6xl mx-auto" />
                            <h3 className="text-3xl font-bold">Community Driven</h3>
                            <p className="text-gray-300 text-lg">
                                Built around film lovers who value storytelling and cinema culture.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ================= KOLLYWOOD SHOWCASE ================= */}
            <KollywoodShowcase />

            {/* ================= MOVIE HIGHLIGHTS ================= */}
            <motion.section
                className="py-32 bg-white"
                variants={sectionAnim}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
            >
                <div className="container-custom">
                    <div className="flex justify-between items-end mb-20">
                        <div>
                            <span className="text-swiss-red uppercase tracking-widest text-sm font-bold">
                                Featured
                            </span>
                            <h2 className="text-5xl font-extrabold text-swiss-black mt-2">
                                MOVIE HIGHLIGHTS
                            </h2>
                        </div>

                        <Link
                            to="/explore"
                            className="hidden md:flex items-center gap-3 font-bold text-lg hover:text-swiss-red transition"
                        >
                            VIEW ALL <FaArrowRight />
                        </Link>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    )}
                </div>
            </motion.section>

            {/* ================= FINAL CTA ================= */}
            <motion.section
                className="py-32 bg-gradient-to-r from-swiss-black to-black text-white text-center"
                variants={sectionAnim}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container-custom max-w-4xl space-y-10">
                    <h2 className="text-5xl font-extrabold">
                        Built for cinema.
                        <span className="block text-swiss-red mt-2">
                            Powered by people.
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300">
                        Film Ledger is specially crafted for Kollywood and global cinema
                        enthusiasts who want more than just ratings.
                    </p>

                    <Link
                        to="/auth"
                        className="inline-flex items-center gap-3 bg-swiss-red px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:scale-105 transition"
                    >
                        GET STARTED <FaPlay />
                    </Link>
                </div>
            </motion.section>

        </div>
    );
};

export default LandingPage;
