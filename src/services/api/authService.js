import { auth } from '@/services/firebase/firebaseConfig';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export const authService = {
    loginWithGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            throw error;
        }
    },

    adminLogin: async (email, password) => {
        // For demo purposes, allow any admin login if email is admin@filmledger.com
        if (email === 'admin@filmledger.com' && password === 'admin123') {
            return {
                uid: 'admin-123',
                email: email,
                displayName: 'Admin User',
                role: 'admin'
            };
        }
        // Fallback to firebase for real auth
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        return signOut(auth);
    }
};
