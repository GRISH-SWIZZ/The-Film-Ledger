import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/services/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // If we have a manual admin session, don't let firebase non-login override it immediately
            const adminSession = localStorage.getItem('admin_session');

            if (adminSession) {
                const adminUser = JSON.parse(adminSession);
                setCurrentUser(adminUser);
                setIsAdmin(true);
                // Ensure admin token is present if managing via API
                if (!localStorage.getItem('adminToken')) {
                    localStorage.setItem('adminToken', 'mock-admin-token');
                }
            } else {
                setCurrentUser(user);

                if (user) {
                    try {
                        const token = await user.getIdToken();
                        localStorage.setItem('userToken', token);
                    } catch (err) {
                        console.error("Failed to get token", err);
                    }
                } else {
                    localStorage.removeItem('userToken');
                }

                // Simple check for actual firebase login that might be admin
                if (user?.email === 'admin@filmledger.com') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }

            setLoading(false);
        });

        // Check for manual admin mock session
        if (localStorage.getItem('admin_session')) {
            setCurrentUser(JSON.parse(localStorage.getItem('admin_session')));
            setIsAdmin(true);
            setLoading(false);
        }

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        isAdmin,
        setCurrentUser, // Exposed for custom admin login flow
        setIsAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
