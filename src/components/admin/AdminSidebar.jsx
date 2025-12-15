import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaFilm,
    FaCommentDots,
    FaUsers,
    FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/api/authService';

const AdminSidebar = ({ onCloseMobile }) => {
    const { setCurrentUser } = useAuth();

    const handleLogout = async () => {
        await authService.logout();
        localStorage.removeItem('admin_session');
        setCurrentUser(null);
    };

    const links = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
        { path: '/admin/movies', label: 'Movies', icon: FaFilm },
        { path: '/admin/reviews', label: 'Reviews', icon: FaCommentDots },
        { path: '/admin/users', label: 'Users', icon: FaUsers },
    ];

    return (
        <aside className="w-full bg-black text-white min-h-screen flex flex-col">

            {/* ===== BRAND ===== */}
            <div className="px-6 py-6 border-b border-red-600/30">
                <h2 className="text-2xl font-extrabold tracking-tight">
                    FILM LEDGER<span className="text-red-600">.</span>
                </h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    Admin Portal
                </p>
            </div>

            {/* ===== NAVIGATION ===== */}
            <nav className="flex-1 px-3 py-6 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={onCloseMobile}
                        className={({ isActive }) =>
                            `
                            group flex items-center gap-4 px-4 py-3 rounded-xl
                            transition-all duration-200
                            ${isActive
                                ? 'bg-red-600 text-white shadow-lg'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                            }
                        `}
                    >
                        <link.icon
                            className="
                                text-lg transition-transform duration-200
                                group-hover:scale-110
                            "
                        />
                        <span className="text-sm font-semibold tracking-wide">
                            {link.label}
                        </span>
                    </NavLink>
                ))}
            </nav>

            {/* ===== LOGOUT ===== */}
            <div className="p-3 border-t border-red-600/20">
                <button
                    onClick={handleLogout}
                    className="
                        group w-full flex items-center gap-4 px-4 py-3 rounded-xl
                        text-zinc-400 hover:text-white
                        bg-zinc-950 hover:bg-red-700
                        transition-all duration-200
                    "
                >
                    <FaSignOutAlt className="text-lg transition-transform duration-200 group-hover:scale-110" />
                    <span className="text-sm font-semibold tracking-wide">
                        Logout
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
