import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, ArrowUp, Flag, Share2, ChevronLeft, ChevronRight, X, Copy, Check, Facebook, Twitter } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import ReportIssueModal from './ReportIssueModal';
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
 * Facebook/Instagram style social card with image carousel
 */
const IssueCard = ({ issue }) => {
    const { isSignedIn, user } = useUserContext();
    const { upvoted, count, loading, toggleUpvote } = useUpvote(
        issue._id,
        issue.upvotesCount
    );
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [shareMenuOpen, setShareMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const category = categoryConfig[issue.category] || categoryConfig.other;
    const isOwnIssue = user && issue.createdBy?._id === user._id;
    const hasImage = issue.images && issue.images.length > 0;
    const hasMultipleImages = issue.images && issue.images.length > 1;

    const nextImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === issue.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? issue.images.length - 1 : prev - 1
        );
    };

    const issueUrl = `${window.location.origin}/issues/${issue._id}`;

    const shareOptions = [
        {
            name: 'WhatsApp',
            icon: <MessageCircle size={40} />,
            color: 'hover:bg-green-500/20 hover:text-green-400',
            action: () => window.open(`https://wa.me/?text=${encodeURIComponent(issue.title + ' - ' + issueUrl)}`, '_blank')
        },
        {
            name: 'Facebook',
            icon: <Facebook size={40} />,
            color: 'hover:bg-blue-500/20 hover:text-blue-400',
            action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(issueUrl)}`, '_blank')
        },
        {
            name: 'Twitter',
            icon: <Twitter size={40} />,
            color: 'hover:bg-sky-500/20 hover:text-sky-400',
            action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(issue.title)}&url=${encodeURIComponent(issueUrl)}`, '_blank')
        },
    ];

    const copyLink = async () => {
        await navigator.clipboard.writeText(issueUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
            {/* Header - Avatar, Name, Time, Status */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <Link to={`/profile/${issue.createdBy?._id}`}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-dark-600">
                            {issue.createdBy?.avatar ? (
                                <img
                                    src={issue.createdBy.avatar}
                                    alt=""
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                getInitials(issue.createdBy?.name)
                            )}
                        </div>
                    </Link>
                    <div>
                        <p className="text-white font-medium text-sm">
                            {issue.createdBy?.name || 'Anonymous'}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-dark-400">
                            <span>{formatRelativeTime(issue.createdAt)}</span>
                            {issue.location?.address && (
                                <>
                                    <span>•</span>
                                    <span className="flex items-center">
                                        <MapPin size={10} className="mr-0.5" />
                                        {truncateText(issue.location.address, 20)}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <StatusBadge status={issue.status} size="sm" />
                </div>
            </div>

            {/* Image Carousel */}
            {hasImage && (
                <div className="relative aspect-[4/3] bg-dark-900 group">
                    <Link to={`/issues/${issue._id}`}>
                        <img
                            src={issue.images[currentImageIndex]}
                            alt={issue.title}
                            className="w-full h-full object-cover"
                        />
                    </Link>

                    {/* Navigation Arrows */}
                    {hasMultipleImages && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-dark-900/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-900"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-dark-900/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-900"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}

                    {/* Dots Indicator */}
                    {hasMultipleImages && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                            {issue.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setCurrentImageIndex(idx);
                                    }}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex
                                        ? 'bg-primary-400 w-3'
                                        : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Image counter */}
                    {hasMultipleImages && (
                        <div className="absolute top-3 right-3 bg-dark-900/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                            {currentImageIndex + 1}/{issue.images.length}
                        </div>
                    )}
                </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-1">
                    {/* Upvote */}
                    <button
                        onClick={() => isSignedIn && toggleUpvote()}
                        disabled={loading || !isSignedIn}
                        className={`flex items-center gap-1.5 p-2 rounded-lg transition-all ${upvoted
                            ? 'text-primary-400'
                            : 'text-dark-300 hover:text-white'
                            } ${!isSignedIn && 'opacity-50 cursor-not-allowed'}`}
                    >
                        <ArrowUp size={22} className={upvoted ? 'fill-primary-400' : ''} />
                    </button>

                    {/* Comments */}
                    <Link
                        to={`/issues/${issue._id}#comments`}
                        className="flex items-center gap-1 p-2 rounded-lg text-dark-300 hover:text-white transition-all"
                    >
                        <MessageCircle size={22} />
                        {(issue.commentsCount || 0) > 0 && (
                            <span className="text-sm">{issue.commentsCount}</span>
                        )}
                    </Link>

                    {/* Share */}
                    <button
                        onClick={() => setShareMenuOpen(true)}
                        className="p-2 rounded-lg text-dark-300 hover:text-white transition-all"
                    >
                        <Share2 size={20} />
                    </button>

                    {/* Report - Only show for non-owners */}
                    {isSignedIn && !isOwnIssue && (
                        <div className="flex items-center gap-1 text-dark-300">
                            <button
                                onClick={() => setReportModalOpen(true)}
                                className="p-2 rounded-lg hover:text-red-400 transition-all"
                            >
                                <Flag size={18} />
                            </button>
                            {(issue.reportsCount || 0) > 0 && (
                                <span className="text-sm text-dark-400">{issue.reportsCount}</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Category & See Details - Stacked */}
                <span className={`text-xs px-2 py-0.5 rounded-full ${category.bg} ${category.color}`}>
                    {category.label}
                </span>
            </div>

            {/* Upvotes count & Title */}
            <div className="px-4 pb-3 flex items-center justify-between">
                <div>
                    <p className="text-white text-xs font-semibold mb-1">
                        {count} upvote{count !== 1 ? 's' : ''}
                    </p>
                    <Link to={`/issues/${issue._id}`}>
                        <p className="text-white font-semibold text-md hover:text-primary-400 transition-colors">
                            {issue.title}
                        </p>
                    </Link>

                </div>
                <Link
                    to={`/issues/${issue._id}`}
                    className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                >
                    See Details...
                </Link>
            </div>

            {/* Category tag if no image */}
            {!hasImage && (
                <div className="px-4 pb-3">
                    <span className={`inline-flex text-xs px-2.5 py-1 rounded-full ${category.bg} ${category.color}`}>
                        {category.label}
                    </span>
                </div>
            )}

            {/* Report Modal */}
            <ReportIssueModal
                isOpen={reportModalOpen}
                onClose={() => setReportModalOpen(false)}
                issueId={issue._id}
                issueTitle={issue.title}
            />

            {/* Share Modal */}
            {shareMenuOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShareMenuOpen(false)}
                    />

                    {/* Dialog */}
                    <div className="relative bg-dark-800 border border-dark-600 rounded-2xl shadow-2xl w-full max-w-sm animate-scale-in">
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-700">
                            <h3 className="text-lg font-semibold text-white">Share</h3>
                            <button
                                onClick={() => setShareMenuOpen(false)}
                                className="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Share Options Grid */}
                        <div className="p-5">
                            <div className="grid grid-cols-4 gap-4">
                                {shareOptions.map((option) => (
                                    <button
                                        key={option.name}
                                        onClick={() => {
                                            option.action();
                                            setShareMenuOpen(false);
                                        }}
                                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-dark-700 transition-all group"
                                    >
                                        <span className="text-3xl">{option.icon}</span>
                                        <span className="text-xs text-dark-400 group-hover:text-white transition-colors">
                                            {option.name}
                                        </span>
                                    </button>
                                ))}
                                <button
                                    onClick={copyLink}
                                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-dark-700 transition-all group"
                                >
                                    {copied ? (
                                        <>
                                            <span className="text-3xl">
                                                <Check size={40} className="text-green-400" />
                                            </span>
                                            <span className="text-xs text-green-400">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-3xl">
                                                <Copy size={40} />
                                            </span>
                                            <span className="text-xs text-dark-400 group-hover:text-white transition-colors">
                                                Copy
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Link Preview */}
                        <div className="px-5 pb-5">
                            <div className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg">
                                <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    N
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white font-medium truncate">{issue.title}</p>
                                    <p className="text-xs text-dark-400 truncate">{issueUrl}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssueCard;




