import React, { useEffect, useState } from "react";
import { movieService } from "@/services/api/movieService";
import { reviewService } from "@/services/api/reviewService";
import { userService } from "@/services/api/userService";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        movies: 0,
        reviews: 0,
        users: 0,
        pending: 0
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                // Movies NEVER require auth → fetch separately
                const movies = await movieService.getAllMovies();

                setStats(prev => ({
                    ...prev,
                    movies: movies.length
                }));

                // Reviews & users might fail → isolate them
                try {
                    const reviews = await reviewService.getAllReviews();
                    setStats(prev => ({
                        ...prev,
                        reviews: reviews.length,
                        pending: reviews.filter(r => r.status === "pending").length
                    }));
                } catch (e) {
                    console.warn("Reviews not loaded");
                }

                try {
                    const users = await userService.getAllUsers();
                    setStats(prev => ({
                        ...prev,
                        users: users.length
                    }));
                } catch (e) {
                    console.warn("Users not loaded");
                }

            } catch (err) {
                console.error("Dashboard load failed", err);
            }
        };

        loadStats();
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-4 gap-6">
                <Stat label="Movies" value={stats.movies} />
                <Stat label="Reviews" value={stats.reviews} />
                <Stat label="Users" value={stats.users} />
                <Stat label="Pending" value={stats.pending} />
            </div>
        </div>
    );
};

const Stat = ({ label, value }) => (
    <div className="bg-white border p-6">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

export default AdminDashboard;
