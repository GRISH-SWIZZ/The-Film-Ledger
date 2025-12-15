import React, { useEffect, useState } from "react";
import { movieService } from "@/services/api/movieService";
import MovieForm from "./MovieForm";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const MovieManagement = () => {
    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const fetchMovies = async () => {
        const data = await movieService.getAllMovies();
        setMovies(data);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleSave = async (movie) => {
        if (editing) {
            await movieService.updateMovie(editing.id, movie);
        } else {
            await movieService.createMovie(movie);
        }
        setOpen(false);
        setEditing(null);
        fetchMovies();
    };

    const handleDelete = async (id) => {
        if (confirm("Delete this movie?")) {
            await movieService.deleteMovie(id);
            fetchMovies();
        }
    };

    return (
        <div className="pt-32 px-8">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-bold">Movies</h1>
                    <p className="text-gray-500">Manage all movies in Film Ledger</p>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
                >
                    <FaPlus /> Add Movie
                </button>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {movies.map((m) => (
                    <div key={m.id} className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="relative">
                            <img src={m.poster_url} className="h-72 w-full object-cover" />
                            <span className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                                ⭐ {m.rating || 0}
                            </span>
                        </div>

                        <div className="p-4">
                            <h3 className="font-bold text-lg">{m.title}</h3>
                            <p className="text-sm text-gray-500">{m.year} • {m.genre}</p>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => { setEditing(m); setOpen(true); }}
                                    className="flex-1 border rounded-md py-2 flex items-center justify-center gap-2"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(m.id)}
                                    className="flex-1 border border-red-500 text-red-600 rounded-md py-2 flex items-center justify-center gap-2"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-3xl rounded-xl p-8 max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl font-bold mb-6">
                                {editing ? "Edit Movie" : "Add Movie"}
                            </h2>

                            <MovieForm
                                initialData={editing}
                                onSubmit={handleSave}
                                onCancel={() => { setOpen(false); setEditing(null); }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MovieManagement;
