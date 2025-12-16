import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Calendar, Settings, LogOut } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import IssueCard from '../components/issues/IssueCard';
import Button from '../components/common/Button';
import { CardSkeletonList } from '../components/common/Loader';
import { useUserContext } from '../context/UserContext';
import { issueApi } from '../services/api';
import { formatDate, getInitials } from '../utils/helpers';

/**
 * Profile Page Component
 * Shows user profile and their reported issues
 */
const Profile = () => {
    const { user, loading: userLoading } = useUserContext();
    const { signOut } = useClerk();

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });

    useEffect(() => {
        const fetchMyIssues = async () => {
            try {
                setLoading(true);
                const response = await issueApi.getMyIssues({ limit: 50 });
                const data = response.data.data;
                setIssues(data);

                // Calculate stats
                const resolved = data.filter((i) => i.status === 'resolved').length;
                setStats({
                    total: data.length,
                    resolved,
                    pending: data.length - resolved,
                });
            } catch (error) {
                console.error('Error fetching issues:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyIssues();
    }, []);

    const handleSignOut = () => {
        signOut();
    };

    if (userLoading) {
        return (
            <div className="min-h-screen bg-dark-900">
                <Navbar />
                <div className="container-custom py-8">
                    <CardSkeletonList count={3} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <main className="container-custom py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
                            <div className="text-center">
                                {/* Avatar */}
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        getInitials(user?.name)
                                    )}
                                </div>

                                {/* Name & Email */}
                                <h2 className="text-xl font-bold text-white mb-1">
                                    {user?.name || 'Anonymous User'}
                                </h2>
                                <p className="text-dark-400 text-sm mb-4">{user?.email}</p>

                                {/* Role Badge */}
                                {user?.role === 'admin' && (
                                    <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 text-sm px-3 py-1 rounded-full mb-4">
                                        <Settings size={14} />
                                        Admin
                                    </span>
                                )}

                                {/* Member Since */}
                                <p className="text-dark-500 text-sm flex items-center justify-center gap-1">
                                    <Calendar size={14} />
                                    Member since {formatDate(user?.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">
                                Your Activity
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-dark-400">Issues Reported</span>
                                    <span className="text-white font-semibold">{stats.total}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-dark-400">Resolved</span>
                                    <span className="text-emerald-400 font-semibold">
                                        {stats.resolved}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-dark-400">Pending</span>
                                    <span className="text-amber-400 font-semibold">
                                        {stats.pending}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            {user?.role === 'admin' && (
                                <Link to="/admin" className="block">
                                    <Button variant="secondary" className="w-full" icon={Settings}>
                                        Admin Dashboard
                                    </Button>
                                </Link>
                            )}
                            <Button
                                variant="ghost"
                                className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                icon={LogOut}
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Your Reported Issues</h2>
                            <Link to="/report">
                                <Button icon={MapPin}>Report New</Button>
                            </Link>
                        </div>

                        {loading ? (
                            <CardSkeletonList count={3} />
                        ) : issues.length === 0 ? (
                            <div className="bg-dark-800 border border-dark-700 rounded-xl p-12 text-center">
                                <MapPin size={48} className="text-dark-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No Issues Reported Yet
                                </h3>
                                <p className="text-dark-400 mb-6">
                                    Start making a difference in your community by reporting civic issues.
                                </p>
                                <Link to="/report">
                                    <Button icon={MapPin}>Report Your First Issue</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {issues.map((issue) => (
                                    <IssueCard key={issue._id} issue={issue} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
