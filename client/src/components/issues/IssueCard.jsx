import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, ArrowUp, Clock, User } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { useUpvote } from '../../hooks/useUpvote';
import { useUserContext } from '../../context/UserContext';
import {
    formatRelativeTime,
    categoryConfig,
    truncateText,
    getInitials,
} from '../../utils/helpers';

/**
 * Issue Card Component
 * Social-media style card for displaying issues in the feed
 */
const IssueCard = ({ issue }) => {
    const { isSignedIn } = useUserContext();
    const { upvoted, count, loading, toggleUpvote } = useUpvote(
        issue._id,
        issue.upvotesCount
    );

    const category = categoryConfig[issue.category] || categoryConfig.other;

    return (
        <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden card-hover">
            {/* Image */}
            {issue.images && issue.images.length > 0 && (
                <Link to={`/issues/${issue._id}`}>
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                        <img
                            src={issue.images[0]}
                            alt={issue.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {issue.images.length > 1 && (
                            <div className="absolute bottom-2 right-2 bg-dark-900/80 px-2 py-1 rounded text-xs text-white">
                                +{issue.images.length - 1} more
                            </div>
                        )}
                    </div>
                </Link>
            )}

            {/* Content */}
            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                        {/* User Avatar */}
                        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
                            {issue.createdBy?.avatar ? (
                                <img
                                    src={issue.createdBy.avatar}
                                    alt={issue.createdBy.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                getInitials(issue.createdBy?.name)
                            )}
                        </div>
                        <div>
                            <p className="text-white font-medium text-sm">
                                {issue.createdBy?.name || 'Anonymous'}
                            </p>
                            <p className="text-dark-400 text-xs flex items-center gap-1">
                                <Clock size={12} />
                                {formatRelativeTime(issue.createdAt)}
                            </p>
                        </div>
                    </div>
                    <StatusBadge status={issue.status} size="sm" />
                </div>

                {/* Title & Description */}
                <Link to={`/issues/${issue._id}`}>
                    <h3 className="text-lg font-semibold text-white mb-2 hover:text-primary-400 transition-colors">
                        {issue.title}
                    </h3>
                    <p className="text-dark-300 text-sm mb-4 line-clamp-2">
                        {truncateText(issue.description, 150)}
                    </p>
                </Link>

                {/* Category & Location */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                        className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full ${category.bg} ${category.color}`}
                    >
                        {category.label}
                    </span>
                    {issue.location?.address && (
                        <span className="inline-flex items-center text-xs text-dark-400">
                            <MapPin size={12} className="mr-1" />
                            {truncateText(issue.location.address, 30)}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-dark-700">
                    {/* Upvote Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (isSignedIn) toggleUpvote();
                        }}
                        disabled={loading || !isSignedIn}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${upvoted
                                ? 'bg-primary-600/20 text-primary-400'
                                : 'text-dark-400 hover:bg-dark-700 hover:text-white'
                            } ${!isSignedIn && 'opacity-50 cursor-not-allowed'}`}
                        title={isSignedIn ? 'Upvote this issue' : 'Sign in to upvote'}
                    >
                        <ArrowUp
                            size={18}
                            className={upvoted ? 'fill-primary-400' : ''}
                        />
                        <span className="text-sm font-medium">{count}</span>
                    </button>

                    {/* Comments */}
                    <Link
                        to={`/issues/${issue._id}#comments`}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-dark-400 hover:bg-dark-700 hover:text-white transition-all duration-200"
                    >
                        <MessageCircle size={18} />
                        <span className="text-sm font-medium">{issue.commentsCount || 0}</span>
                    </Link>

                    {/* View Details */}
                    <Link
                        to={`/issues/${issue._id}`}
                        className="ml-auto text-sm text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        View Details →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IssueCard;
