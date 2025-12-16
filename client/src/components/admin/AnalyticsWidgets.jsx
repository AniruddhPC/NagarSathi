import {
    BarChart3,
    TrendingUp,
    CheckCircle,
    Clock,
    AlertCircle,
    Users,
    MapPin,
} from 'lucide-react';
import { formatNumber } from '../../utils/helpers';

/**
 * Analytics Widgets Component
 * Dashboard analytics cards
 */
const AnalyticsWidgets = ({ data }) => {
    if (!data) return null;

    const { overview, statusBreakdown, categoryBreakdown, trendingIssues, hotspots } = data;

    // Stats cards
    const statsCards = [
        {
            title: 'Total Issues',
            value: overview?.totalIssues || 0,
            icon: BarChart3,
            color: 'text-primary-400',
            bgColor: 'bg-primary-500/20',
        },
        {
            title: 'Reported Today',
            value: overview?.reportedToday || 0,
            icon: AlertCircle,
            color: 'text-red-400',
            bgColor: 'bg-red-500/20',
        },
        {
            title: 'Resolution Rate',
            value: `${overview?.resolutionRate || 0}%`,
            icon: CheckCircle,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/20',
        },
        {
            title: 'Total Users',
            value: overview?.totalUsers || 0,
            icon: Users,
            color: 'text-amber-400',
            bgColor: 'bg-amber-500/20',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-dark-800 border border-dark-700 rounded-xl p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-dark-400 text-sm">{stat.title}</span>
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <stat.icon size={18} className={stat.color} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            {formatNumber(stat.value)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Status & Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status Breakdown */}
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock size={20} className="text-primary-400" />
                        Status Breakdown
                    </h3>
                    <div className="space-y-4">
                        {/* Reported */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-dark-300 text-sm">Reported</span>
                                <span className="text-red-400 font-medium">
                                    {statusBreakdown?.reported || 0}
                                </span>
                            </div>
                            <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-red-500 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${overview?.totalIssues
                                                ? ((statusBreakdown?.reported || 0) /
                                                    overview.totalIssues) *
                                                100
                                                : 0
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* In Progress */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-dark-300 text-sm">In Progress</span>
                                <span className="text-amber-400 font-medium">
                                    {statusBreakdown?.in_progress || 0}
                                </span>
                            </div>
                            <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${overview?.totalIssues
                                                ? ((statusBreakdown?.in_progress || 0) /
                                                    overview.totalIssues) *
                                                100
                                                : 0
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Resolved */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-dark-300 text-sm">Resolved</span>
                                <span className="text-emerald-400 font-medium">
                                    {statusBreakdown?.resolved || 0}
                                </span>
                            </div>
                            <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${overview?.totalIssues
                                                ? ((statusBreakdown?.resolved || 0) /
                                                    overview.totalIssues) *
                                                100
                                                : 0
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <BarChart3 size={20} className="text-primary-400" />
                        By Category
                    </h3>
                    <div className="space-y-3">
                        {categoryBreakdown?.slice(0, 6).map((cat, index) => {
                            const maxCount = categoryBreakdown[0]?.count || 1;
                            const percentage = (cat.count / maxCount) * 100;

                            return (
                                <div key={cat._id || index}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-dark-300 text-sm capitalize">
                                            {cat._id?.replace('_', ' ') || 'Unknown'}
                                        </span>
                                        <span className="text-dark-200 font-medium">{cat.count}</span>
                                    </div>
                                    <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary-500 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Trending Issues & Hotspots */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trending Issues */}
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-primary-400" />
                        Trending Issues
                    </h3>
                    {trendingIssues?.length > 0 ? (
                        <div className="space-y-3">
                            {trendingIssues.slice(0, 5).map((issue, index) => (
                                <div
                                    key={issue._id}
                                    className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg"
                                >
                                    <span
                                        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index === 0
                                                ? 'bg-amber-500 text-white'
                                                : 'bg-dark-600 text-dark-300'
                                            }`}
                                    >
                                        {index + 1}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium truncate">
                                            {issue.title}
                                        </p>
                                        <p className="text-dark-400 text-xs capitalize">
                                            {issue.category?.replace('_', ' ')}
                                        </p>
                                    </div>
                                    <span className="text-primary-400 text-sm font-medium">
                                        {issue.upvotesCount} ↑
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-dark-400 text-sm">No trending issues yet.</p>
                    )}
                </div>

                {/* Hotspots */}
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <MapPin size={20} className="text-primary-400" />
                        Issue Hotspots
                    </h3>
                    {hotspots?.length > 0 ? (
                        <div className="space-y-3">
                            {hotspots.slice(0, 5).map((hotspot, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-dark-700/50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index === 0
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-dark-600 text-dark-300'
                                                }`}
                                        >
                                            {index + 1}
                                        </span>
                                        <span className="text-dark-200 text-sm truncate max-w-[200px]">
                                            {hotspot._id || 'Unknown Location'}
                                        </span>
                                    </div>
                                    <span className="text-dark-400 text-sm">
                                        {hotspot.count} issues
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-dark-400 text-sm">No hotspot data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsWidgets;
