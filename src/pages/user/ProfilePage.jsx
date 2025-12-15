import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/api/userService';
import UserProfileCard from '@/components/user/UserProfileCard';
import UserReviewHistory from '@/components/user/UserReviewHistory';
import Loader from '@/components/common/Loader';

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            if (currentUser) {
                try {
                    const profile = await userService.getUserProfile(currentUser.uid);
                    setUserProfile(profile);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadProfile();
    }, [currentUser]);

    if (loading) return <Loader fullScreen />;

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-16">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: User Card */}
                    <div className="lg:col-span-1">
                        {userProfile && <UserProfileCard user={userProfile} />}
                    </div>

                    {/* Right Column: History & settings */}
                    <div className="lg:col-span-2">
                        <UserReviewHistory />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
