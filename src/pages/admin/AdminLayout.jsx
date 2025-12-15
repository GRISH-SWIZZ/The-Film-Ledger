import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import AdminSidebar from '@/components/admin/AdminSidebar'

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-black relative">

            {/* ===== Mobile Top Bar ===== */}
            <div
                className="
                    lg:hidden fixed top-0 left-0 right-0 h-16
                    bg-black text-white
                    flex items-center justify-between
                    px-6 z-50
                    border-b border-red-600/30
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            w-9 h-9 bg-red-600 rounded-lg
                            flex items-center justify-center
                            text-sm font-extrabold
                        "
                    >
                        A
                    </div>
                    <span className="text-xs font-extrabold tracking-[0.25em]">
                        ADMIN
                    </span>
                </div>

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="
                        p-2 rounded-md
                        hover:bg-red-600/20
                        transition-colors
                    "
                >
                    <FaBars className="text-xl" />
                </button>
            </div>

            {/* ===== Sidebar ===== */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 w-72
                    bg-zinc-950 text-white
                    border-r border-red-600/30
                    z-40 shadow-2xl
                    transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                    transition-transform duration-300 ease-in-out
                    flex flex-col
                `}
            >
                {/* Sidebar Header */}
                <div
                    className="
                        hidden lg:flex items-center gap-3
                        px-6 py-5
                        border-b border-red-600/30
                        bg-black
                    "
                >
                    <AdminSidebar onCloseMobile={() => setIsSidebarOpen(false)} />
                </div>
            </aside>

            {/* ===== Overlay (Mobile) ===== */}
            {isSidebarOpen && (
                <div
                    className="
                        fixed inset-0 bg-black/70
                        backdrop-blur-sm
                        z-30 lg:hidden
                    "
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* ===== Main Content ===== */}
            <main
                className="
                    flex-1
                    pt-20 lg:pt-10 pb-12
                    px-6 lg:px-10 xl:px-14
                    bg-zinc-100
                "
            >
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AdminLayout
