import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Users, Settings } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import IssueTable from '../components/admin/IssueTable';
import AnalyticsWidgets from '../components/admin/AnalyticsWidgets';
import StatusUpdateModal from '../components/admin/StatusUpdateModal';
import IssueFilters from '../components/issues/IssueFilters';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { useUserContext } from '../context/UserContext';
import { adminApi } from '../services/api';
import toast from 'react-hot-toast';

/**
 * Admin Dashboard Page
 * Issue management and analytics for admins
 */
const AdminDashboard = () => {
    const { user, isAdmin, loading: userLoading } = useUserContext();

    const [activeTab, setActiveTab] = useState('issues');
    const [issues, setIssues] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [params, setParams] = useState({ limit: 15 });
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [updating, setUpdating] = useState(false);

    // Fetch issues
    const fetchIssues = async () => {
        try {
            setLoading(true);
            const response = await adminApi.getAllIssues(params);
            setIssues(response.data.data);
            setPagination({
                page: response.data.page,
                pages: response.data.pages,
                total: response.data.total,
            });
        } catch (error) {
            toast.error('Failed to fetch issues');
        } finally {
            setLoading(false);
        }
    };

    // Fetch analytics
    const fetchAnalytics = async () => {
        try {
            const response = await adminApi.getAnalytics({ days: 30 });
            setAnalytics(response.data.data);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        }
    };

    useEffect(() => {
        if (isAdmin) {
            fetchIssues();
            fetchAnalytics();
        }
    }, [isAdmin, params]);

    // Redirect if not admin
    if (userLoading) {
        return (
            <div className="min-h-screen bg-dark-900 flex items-center justify-center">
                <Loader size="lg" text="Loading..." />
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    const handlePageChange = (page) => {
        setParams((prev) => ({ ...prev, page }));
    };

    const handleFilterChange = (newParams) => {
        setParams((prev) => ({ ...prev, ...newParams, page: 1 }));
    };

    const handleResetFilters = () => {
        setParams({ limit: 15 });
    };

    const handleStatusUpdate = (issue) => {
        setSelectedIssue(issue);
        setModalOpen(true);
    };

    const handleSubmitStatus = async (issueId, data, isResolution) => {
        try {
            setUpdating(true);

            if (isResolution) {
                await adminApi.resolveIssue(issueId, data);
                toast.success('Issue marked as resolved');
            } else {
                await adminApi.updateIssueStatus(issueId, data);
                toast.success('Status updated');
            }

            setModalOpen(false);
            fetchIssues();
            fetchAnalytics();
        } catch (error) {
            toast.error(error.message || 'Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (issueId) => {
        if (!window.confirm('Are you sure you want to delete this issue?')) return;

        try {
            await adminApi.deleteIssue(issueId);
            toast.success('Issue deleted');
            fetchIssues();
            fetchAnalytics();
        } catch (error) {
            toast.error(error.message || 'Failed to delete issue');
        }
    };

    const tabs = [
        { id: 'issues', label: 'Issues', icon: LayoutDashboard },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <main className="container-custom py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                            Admin Dashboard
                        </h1>
                        <p className="text-dark-400">
                            Manage issues and monitor platform analytics
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-dark-400">
                        <Settings size={18} />
                        <span>Welcome, {user?.name}</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-dark-700 pb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-primary-600 text-white'
                                    : 'text-dark-400 hover:text-white hover:bg-dark-700'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'issues' && (
                    <div className="space-y-6">
                        {/* Filters */}
                        <IssueFilters
                            params={params}
                            onFilterChange={handleFilterChange}
                            onReset={handleResetFilters}
                        />

                        {/* Issue Table */}
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <Loader size="lg" text="Loading issues..." />
                            </div>
                        ) : (
                            <IssueTable
                                issues={issues}
                                pagination={pagination}
                                onPageChange={handlePageChange}
                                onStatusUpdate={handleStatusUpdate}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <AnalyticsWidgets data={analytics} />
                )}
            </main>

            {/* Status Update Modal */}
            <StatusUpdateModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                issue={selectedIssue}
                onSubmit={handleSubmitStatus}
                loading={updating}
            />
        </div>
    );
};

export default AdminDashboard;
