import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useUserContext } from './context/UserContext';
import { PageLoader } from './components/common/Loader';

// Lazy load pages for code splitting (faster initial load)
const Landing = lazy(() => import('./pages/Landing'));
const Home = lazy(() => import('./pages/Home'));
const ReportIssue = lazy(() => import('./pages/ReportIssue'));
const IssueDetail = lazy(() => import('./pages/IssueDetail'));
const Profile = lazy(() => import('./pages/Profile'));
const MapPage = lazy(() => import('./pages/MapPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

/**
 * Protected Route Component
 * Redirects to sign-in if not authenticated
 */
const ProtectedRoute = ({ children }) => {
    const { loading } = useUserContext();

    if (loading) {
        return <PageLoader />;
    }

    return (
        <>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
                <Navigate to="/sign-in" replace />
            </SignedOut>
        </>
    );
};

/**
 * Main App Component
 * Handles routing for the entire application
 */
function App() {
    return (
        <Suspense fallback={<PageLoader text="Loading page..." />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/landing" element={<Landing />} />
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/issues/:id" element={<IssueDetail />} />

                {/* Auth Routes */}
                <Route
                    path="/sign-in/*"
                    element={
                        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
                            <SignIn
                                routing="path"
                                path="/sign-in"
                                signUpUrl="/sign-up"
                                afterSignInUrl="/"
                                appearance={{
                                    elements: {
                                        rootBox: 'mx-auto',
                                        card: 'bg-dark-800 border border-dark-700',
                                    },
                                }}
                            />
                        </div>
                    }
                />
                <Route
                    path="/sign-up/*"
                    element={
                        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
                            <SignUp
                                routing="path"
                                path="/sign-up"
                                signInUrl="/sign-in"
                                afterSignUpUrl="/"
                                appearance={{
                                    elements: {
                                        rootBox: 'mx-auto',
                                        card: 'bg-dark-800 border border-dark-700',
                                    },
                                }}
                            />
                        </div>
                    }
                />

                {/* Protected Routes */}
                <Route
                    path="/report"
                    element={
                        <ProtectedRoute>
                            <ReportIssue />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
}

export default App;
