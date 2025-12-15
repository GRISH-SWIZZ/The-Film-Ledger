import React, { useEffect, useState } from "react";

const emptyMovie = {
    title: "",
    genre: "",
    year: "",
    duration: "",
    poster_url: "",
    trailerUrl: "",
    description: "",
    cast: "",
    crew: {
        director: "",
        music: "",
        cinematography: "",
        editor: ""
    }
};

const MovieForm = ({ initialData, onSubmit, onCancel }) => {
    const [movie, setMovie] = useState(emptyMovie);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setMovie({
                ...initialData,
                cast: initialData.cast?.join(", ") || ""
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

        if (name.startsWith("crew.")) {
            const key = name.split(".")[1];
            setMovie((prev) => ({
                ...prev,
                crew: { ...prev.crew, [key]: value }
            }));
        } else {
            setMovie((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!movie.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!movie.genre.trim()) {
            newErrors.genre = "Genre is required";
        }

        if (!movie.year) {
            newErrors.year = "Year is required";
        } else if (movie.year < 1800 || movie.year > 2100) {
            newErrors.year = "Please enter a valid year";
        }

        if (movie.duration && movie.duration < 1) {
            newErrors.duration = "Duration must be at least 1 minute";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) {
            return;
        }

        const formattedMovie = {
            ...movie,
            year: Number(movie.year),
            duration: movie.duration ? Number(movie.duration) : 0,
            cast: movie.cast
                ? movie.cast
                    .split(",")
                    .map((c) => c.trim())
                    .filter(Boolean)
                : []
        };

        onSubmit(formattedMovie);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const inputClass = (fieldName) =>
        `w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${errors[fieldName] ? "border-red-500" : "border-gray-300"
        }`;

    return (
        <div className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {initialData ? "Edit Movie" : "Add New Movie"}
            </h2>

            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        name="title"
                        placeholder="Title *"
                        value={movie.title}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className={inputClass("title")}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>

                <div>
                    <input
                        name="genre"
                        placeholder="Genre *"
                        value={movie.genre}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className={inputClass("genre")}
                    />
                    {errors.genre && (
                        <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
                    )}
                </div>

                <div>
                    <input
                        name="year"
                        type="number"
                        min="1800"
                        max="2100"
                        placeholder="Year *"
                        value={movie.year}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className={inputClass("year")}
                    />
                    {errors.year && (
                        <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                    )}
                </div>

                <div>
                    <input
                        name="duration"
                        type="number"
                        min="1"
                        placeholder="Duration (minutes)"
                        value={movie.duration}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className={inputClass("duration")}
                    />
                    {errors.duration && (
                        <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                    )}
                </div>

                <div>
                    <input
                        name="poster_url"
                        placeholder="Poster URL"
                        value={movie.poster_url}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className={inputClass("poster_url")}
                    />
                </div>

                <div>
                    <input
                        name="trailerUrl"
                        placeholder="Trailer URL"
                        value={movie.trailerUrl}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className={inputClass("trailerUrl")}
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={movie.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
            </div>

            {/* Cast */}
            <div>
                <input
                    name="cast"
                    placeholder="Cast (comma separated)"
                    value={movie.cast}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="text-gray-500 text-sm mt-1">
                    Example: Actor 1, Actor 2, Actor 3
                </p>
            </div>

            {/* Crew Section */}
            <div>
                <h4 className="font-semibold text-gray-800 mb-3 text-lg">Crew</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        name="crew.director"
                        placeholder="Director"
                        value={movie.crew.director}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        name="crew.music"
                        placeholder="Music Composer"
                        value={movie.crew.music}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        name="crew.cinematography"
                        placeholder="Cinematography"
                        value={movie.crew.cinematography}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        name="crew.editor"
                        placeholder="Editor"
                        value={movie.crew.editor}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                >
                    {initialData ? "Update Movie" : "Save Movie"}
                </button>
            </div>

            <p className="text-sm text-gray-500 text-center">
                * Required fields
            </p>
        </div>
    );
};

export default MovieForm;