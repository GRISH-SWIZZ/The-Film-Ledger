import React from 'react';
import Card from '@/components/ui/Card';
import { FaUser, FaCog } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserProfileCard = ({ user }) => {
    return (
        <Card className="
            relative text-center
            bg-white border border-zinc-200
            rounded-2xl shadow-lg
            px-6 py-8
        ">
            {/* Settings */}
            <button
                onClick={() => toast.info("Settings coming soon")}
                className="
                    absolute top-4 right-4
                    text-zinc-400 hover:text-red-600
                    transition-colors
                "
                title="Settings"
            >
                <FaCog />
            </button>

            {/* Avatar */}
            <div className="
                w-24 h-24 mx-auto mb-4
                rounded-full overflow-hidden
                bg-zinc-100
                flex items-center justify-center
                border-2 border-red-600/40
                shadow-md
            ">
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <FaUser className="text-3xl text-zinc-400" />
                )}
            </div>

            {/* Identity */}
            <h2 className="text-xl font-extrabold tracking-wide text-black">
                {user.displayName}
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
                {user.email}
            </p>

            {/* Stats */}
            <div className="
                grid grid-cols-3 gap-4
                border-t border-zinc-200 pt-6
            ">
                <div>
                    <span className="block text-xl font-extrabold text-black">
                        {user.stats?.reviews || 0}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                        Reviews
                    </span>
                </div>

                <div>
                    <span className="block text-xl font-extrabold text-black">
                        {user.stats?.followers || 0}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                        Followers
                    </span>
                </div>

                <div>
                    <span className="block text-xl font-extrabold text-black">
                        {user.stats?.following || 0}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                        Following
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default UserProfileCard;
