import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

const MovieForm = ({ initialData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        year: '',
        duration: '',
        director: '',
        description: '',
        poster_url: '',
        rating: 0
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 py-2 focus:border-swiss-black outline-none transition-colors"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Director</label>
                    <input
                        type="text"
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 py-2 focus:border-swiss-black outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Genre</label>
                    <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 py-2 focus:border-swiss-black outline-none transition-colors bg-transparent"
                        required
                    >
                        <option value="">Select Genre</option>
                        <option value="Action">Action</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Horror">Horror</option>
                        <option value="Thriller">Thriller</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Year</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:border-swiss-black outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Duration (min)</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:border-swiss-black outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Poster URL</label>
                <input
                    type="url"
                    name="poster_url"
                    value={formData.poster_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full border-b border-gray-300 py-2 focus:border-swiss-black outline-none transition-colors"
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-gray-50 p-4 border-l-2 border-gray-300 focus:border-swiss-black outline-none transition-colors resize-none"
                    required
                ></textarea>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-100">
                <Button type="button" variant="ghost" onClick={onClose} className="w-1/2">Cancel</Button>
                <Button type="submit" className="w-1/2">
                    {initialData ? 'Update Movie' : 'Add Movie'}
                </Button>
            </div>
        </form>
    );
};

export default MovieForm;
