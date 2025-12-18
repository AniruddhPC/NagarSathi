import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Map, AlertCircle } from 'lucide-react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import IssueCard from '../components/issues/IssueCard';
import IssueFilters from '../components/issues/IssueFilters';
import Button from '../components/common/Button';
import { CardSkeletonList } from '../components/common/Loader';
import { useIssues } from '../hooks/useIssues';

/**
 * Home Page Component
 * Main feed showing all issues
 */
const Home = () => {
    const {
        issues,
        loading,
        error,
        pagination,
        params,
        updateParams,
        resetParams,
        goToPage,
        refetch,
    } = useIssues({ limit: 10 });

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <main className="container-custom py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                            Issue Feed
                        </h1>
                        <p className="text-dark-400">
                            {pagination.total} issues reported in your community
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/map">
                            <Button variant="secondary" icon={Map}>
                                Map View
                            </Button>
                        </Link>
                        <SignedIn>
                            <Link to="/report">
                                <Button icon={Plus}>Report Issue</Button>
                            </Link>
                        </SignedIn>
                        <SignedOut>
                            <Link to="/sign-in">
                                <Button icon={Plus}>Sign In to Report</Button>
                            </Link>
                        </SignedOut>
                    </div>
                </div>

                {/* Main Content with Sidebar Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar - Filters */}
                    <aside className="lg:w-72 flex-shrink-0">
                        <IssueFilters
                            params={params}
                            onFilterChange={updateParams}
                            onReset={resetParams}
                        />
                    </aside>

                    {/* Right Content - Issue List */}
                    <div className="flex-1">
                        {loading ? (
                            <CardSkeletonList count={5} />
                        ) : error ? (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
                                <AlertCircle size={40} className="text-red-400 mx-auto mb-3" />
                                <p className="text-red-400 mb-4">{error}</p>
                                <Button variant="secondary" onClick={refetch}>
                                    Try Again
                                </Button>
                            </div>
                        ) : issues.length === 0 ? (
                            <div className="bg-dark-800 border border-dark-700 rounded-xl p-12 text-center">
                                <MapPin size={48} className="text-dark-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No Issues Found
                                </h3>
                                <p className="text-dark-400 mb-6">
                                    {params.category || params.status || params.search || params.state || params.district
                                        ? 'Try adjusting your filters to see more results.'
                                        : 'Be the first to report an issue in your community!'}
                                </p>
                                {params.category || params.status || params.search || params.state || params.district ? (
                                    <Button variant="secondary" onClick={resetParams}>
                                        Clear Filters
                                    </Button>
                                ) : (
                                    <SignedIn>
                                        <Link to="/report">
                                            <Button icon={Plus}>Report Issue</Button>
                                        </Link>
                                    </SignedIn>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                    {issues.map((issue) => (
                                        <IssueCard key={issue._id} issue={issue} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.pages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-10">
                                        <Button
                                            variant="secondary"
                                            onClick={() => goToPage(pagination.page - 1)}
                                            disabled={pagination.page <= 1}
                                        >
                                            Previous
                                        </Button>
                                        <span className="text-dark-400 px-4">
                                            Page {pagination.page} of {pagination.pages}
                                        </span>
                                        <Button
                                            variant="secondary"
                                            onClick={() => goToPage(pagination.page + 1)}
                                            disabled={pagination.page >= pagination.pages}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

// Need to import MapPin for empty state
import { MapPin } from 'lucide-react';

export default Home;
