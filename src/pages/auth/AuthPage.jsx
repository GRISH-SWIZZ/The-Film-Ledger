import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/api/authService';
import { FaGoogle, FaUserShield } from 'react-icons/fa';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { BoxReveal } from '@/components/ui/BoxReveal';
import { AnimatedInput } from '@/components/ui/AnimatedInput';

const AuthPage = () => {
    const { currentUser, setCurrentUser, setIsAdmin } = useAuth();
    const navigate = useNavigate();
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const [adminCreds, setAdminCreds] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (currentUser) {
        return <Navigate to="/user/home" replace />;
    }

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await authService.loginWithGoogle();
            toast.success("Welcome back!");
            navigate('/user/home');
        } catch (error) {
            console.error("Google Login Error:", error);
            console.error("Error Code:", error.code);
            console.error("Error Message:", error.message);

            let errorMessage = "Google login failed. Please try again.";

            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = "Login cancelled.";
            } else if (error.code === 'auth/popup-blocked') {
                errorMessage = "Popup blocked. Please allow popups for this site.";
            } else if (error.code === 'auth/cancelled-popup-request') {
                errorMessage = "Only one login request allowed at a time.";
            } else if (error.code === 'auth/operation-not-allowed') {
                errorMessage = "Google Sign-In is not enabled in Firebase Console.";
            } else if (error.code === 'auth/configuration-not-found') {
                errorMessage = "Google Sign-In disabled in Firebase Console. Please enable it.";
            } else if (error.code === 'auth/unauthorized-domain') {
                errorMessage = "This domain (localhost) is not authorized in Firebase Console.";
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await authService.adminLogin(adminCreds.email, adminCreds.password);

            // Mock persistent admin session for demo since we might simulate
            if (adminCreds.email === 'admin@filmledger.com') {
                const adminUser = {
                    uid: 'admin-123',
                    email: adminCreds.email,
                    displayName: 'Admin User',
                    photoURL: null
                };
                localStorage.setItem('admin_session', JSON.stringify(adminUser));

                // CRITICAL FIX: Directly update context state so AdminRoute sees the change immediately
                setCurrentUser(adminUser);
                setIsAdmin(true);
            }

            toast.success("Admin access granted.");
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error("Invalid admin credentials.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* User Side (Left) */}
            <div className={`p-8 md:p-12 lg:p-20 flex flex-col justify-center transition-all duration-500 ${isAdminLogin ? 'hidden lg:flex bg-gray-100 opacity-50' : 'bg-white'}`}>
                <div className="max-w-md mx-auto w-full">
                    <BoxReveal boxColor="#ff0000" duration={0.5}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-swiss-black">User Access</h2>
                    </BoxReveal>

                    <BoxReveal boxColor="#ff0000" duration={0.5}>
                        <p className="text-gray-600 text-base md:text-lg mb-12 leading-relaxed">Join our community to rate movies and share your reviews.</p>
                    </BoxReveal>

                    <BoxReveal boxColor="#ff0000" duration={0.5}>
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full btn-outline flex items-center justify-center gap-4 text-base md:text-lg py-4 md:py-5 mb-8 hover:bg-swiss-black hover:text-white relative overflow-hidden group"
                        >
                            <FaGoogle className="text-swiss-red text-xl" />
                            {loading ? 'Signing In...' : 'Sign In with Google'}
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-swiss-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </button>
                    </BoxReveal>

                    <BoxReveal boxColor="#ff0000" duration={0.5}>
                        <div className="space-y-4 text-sm md:text-base text-gray-600">
                            <div className="flex items-center gap-4"><div className="w-2 h-2 bg-swiss-red rounded-full flex-shrink-0"></div> No password required</div>
                            <div className="flex items-center gap-4"><div className="w-2 h-2 bg-swiss-red rounded-full flex-shrink-0"></div> Secure authentication</div>
                            <div className="flex items-center gap-4"><div className="w-2 h-2 bg-swiss-red rounded-full flex-shrink-0"></div> Instant access</div>
                        </div>
                    </BoxReveal>

                    <div className="mt-12 pt-8 border-t-2 border-gray-200 lg:hidden">
                        <button onClick={() => setIsAdminLogin(true)} className="text-sm font-bold text-swiss-red uppercase tracking-widest hover:underline">
                            Switch to Admin Login →
                        </button>
                    </div>
                </div>
            </div>

            {/* Admin Side (Right) */}
            <div className={`p-8 md:p-12 lg:p-20 flex flex-col justify-center text-white transition-all duration-500 ${isAdminLogin ? 'bg-swiss-black' : 'bg-swiss-black hidden lg:flex'}`}>
                <div className="max-w-md mx-auto w-full">
                    <BoxReveal boxColor="#ffffff" duration={0.5}>
                        <div className="flex items-center gap-4 mb-8 text-swiss-red">
                            <FaUserShield size={32} />
                            <span className="font-bold uppercase tracking-widest text-sm">Restricted Area</span>
                        </div>
                    </BoxReveal>

                    <BoxReveal boxColor="#ffffff" duration={0.5}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-10">Admin Portal</h2>
                    </BoxReveal>

                    <form onSubmit={handleAdminLogin} className="space-y-6">
                        <BoxReveal boxColor="#ffffff" duration={0.5}>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Username / Email</label>
                                <AnimatedInput
                                    type="email"
                                    placeholder="admin@filmledger.com"
                                    value={adminCreds.email}
                                    onChange={(e) => setAdminCreds({ ...adminCreds, email: e.target.value })}
                                    required
                                    className="bg-white text-swiss-black"
                                />
                            </div>
                        </BoxReveal>

                        <BoxReveal boxColor="#ffffff" duration={0.5}>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Password</label>
                                <div className="relative">
                                    <AnimatedInput
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={adminCreds.password}
                                        onChange={(e) => setAdminCreds({ ...adminCreds, password: e.target.value })}
                                        required
                                        className="bg-white text-swiss-black pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-swiss-red transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </BoxReveal>

                        <BoxReveal boxColor="#ffffff" duration={0.5}>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary mt-8 py-4 md:py-5 text-base md:text-lg font-bold relative overflow-hidden group"
                            >
                                {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
                                <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </button>
                        </BoxReveal>
                    </form>

                    {!isAdminLogin && (
                        <div className="mt-8 text-sm text-gray-400 leading-relaxed">
                            Navigate here to manage content and users.
                        </div>
                    )}

                    {isAdminLogin && (
                        <div className="mt-12 text-center lg:hidden">
                            <button onClick={() => setIsAdminLogin(false)} className="text-sm text-gray-400 hover:text-white transition-colors">← Back to User Login</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
