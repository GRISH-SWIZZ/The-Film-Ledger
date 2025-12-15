import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Loader from '@/components/common/Loader';
import ProtectedRoute from '@/routes/ProtectedRoute';
import AdminRoute from '@/routes/AdminRoute';
import { PageBackground } from '@/components/ui/BackgroundPaths';

// Lazy Loaded Pages
const LandingPage = lazy(() => import('@/pages/landing/LandingPage'));
const AuthPage = lazy(() => import('@/pages/auth/AuthPage'));
const UserHome = lazy(() => import('@/pages/user/UserHome'));
const ProfilePage = lazy(() => import('@/pages/user/ProfilePage'));
const ExplorePage = lazy(() => import('@/pages/user/ExplorePage'));
const MovieDetailsPage = lazy(() => import('@/pages/user/MovieDetailsPage'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const MovieManagement = lazy(() => import('@/pages/admin/MovieManagement'));
const ReviewModeration = lazy(() => import('@/pages/admin/ReviewModeration'));
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));
const Unauthorized = lazy(() => import('@/pages/error/Unauthorized'));
const PrivacyPolicy = lazy(() => import('@/pages/landing/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/landing/TermsOfService'));

// ================= LAYOUT WRAPPER =================
const MainLayout = () => (
  <div className="relative min-h-screen flex flex-col">

    {/* BACKGROUND — always behind everything */}
    <div className="fixed inset-0 -z-10">
      <PageBackground />
    </div>

    {/* HEADER — always on top */}
    <div className="relative z-50">
      <Header />
    </div>

    {/* MAIN CONTENT */}
    <main className="flex-grow relative z-10 pt-20">
      <Outlet />
    </main>

    {/* FOOTER — above background */}
    <footer className="relative z-40 bg-swiss-black">
      <Footer />
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Loader fullScreen />}>
          <Routes>
            <Route element={<MainLayout />}>

              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* Protected User Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/user/profile" element={<ProfilePage />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/movies" element={<MovieManagement />} />
                  <Route path="/admin/reviews" element={<ReviewModeration />} />
                </Route>
              </Route>

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="container-custom py-40 text-center mt-20">
                    <h1 className="text-6xl font-bold text-swiss-red mb-4">404</h1>
                    <p>Page not found</p>
                  </div>
                }
              />

            </Route>
          </Routes>
        </Suspense>

        <ToastContainer position="bottom-right" theme="dark" />
      </AuthProvider>
    </Router>
  );
}

export default App;
