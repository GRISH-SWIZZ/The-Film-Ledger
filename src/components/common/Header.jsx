import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/api/authService";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Shield } from "lucide-react";

const Header = () => {
    const { currentUser, isAdmin, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem("admin_session");
            localStorage.removeItem("userToken");
            localStorage.removeItem("adminToken");
            setCurrentUser(null);
            navigate("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto h-20 px-8 flex items-center">

                {/* LEFT */}
                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-tight text-swiss-black"
                >
                    FILM LEDGER<span className="text-swiss-red">.</span>
                </Link>

                {/* CENTER */}
                <nav className="flex-1 flex justify-center gap-14">
                    <Link className="text-lg font-semibold hover:text-swiss-red" to={currentUser ? "/user/home" : "/"}>
                        Home
                    </Link>
                    <Link className="text-lg font-semibold hover:text-swiss-red" to="/explore">
                        Explore
                    </Link>
                </nav>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                    {isAdmin && (
                        <Link
                            to="/admin/dashboard"
                            className="px-5 py-2 text-sm font-bold border-2 border-swiss-red text-swiss-red rounded-full hover:bg-swiss-red hover:text-white transition"
                        >
                            Admin
                        </Link>
                    )}

                    {!currentUser && (
                        <Link
                            to="/auth"
                            className="px-6 py-2.5 text-sm font-bold bg-swiss-red text-white rounded-full"
                        >
                            Login
                        </Link>
                    )}

                    {currentUser && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border shadow-sm">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={currentUser.photoURL} />
                                        <AvatarFallback className="bg-swiss-red/10 text-swiss-red font-bold">
                                            {currentUser.displayName?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden sm:block font-semibold">
                                        {currentUser.displayName?.split(" ")[0]}
                                    </span>
                                </button>
                            </PopoverTrigger>

                            {/* ✅ FIXED ALIGNMENT */}
                            <PopoverContent
                                align="end"
                                side="bottom"
                                sideOffset={12}
                                className="w-64 rounded-xl border bg-white shadow-xl p-0"
                            >
                                {/* Header */}
                                <div className="px-4 py-3 border-b">
                                    <p className="text-sm font-semibold">
                                        {currentUser.displayName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {currentUser.email}
                                    </p>
                                </div>

                                {/* Body */}
                                <div className="py-2">
                                    <Link
                                        to="/user/profile"
                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        View Profile
                                    </Link>

                                    {isAdmin && (
                                        <Link
                                            to="/admin/dashboard"
                                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            <Shield size={16} />
                                            Admin Dashboard
                                        </Link>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-3 border-t">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-swiss-red text-swiss-red hover:bg-swiss-red hover:text-white transition"
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
