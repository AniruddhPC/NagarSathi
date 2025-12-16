import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../common/Button';

/**
 * Issue Filters Component
 * Filter bar for issues list
 */
const IssueFilters = ({ params, onFilterChange, onReset }) => {
    const [showFilters, setShowFilters] = useState(false);

    const categories = [
        { value: '', label: 'All Categories' },
        { value: 'pothole', label: 'Pothole' },
        { value: 'garbage', label: 'Garbage' },
        { value: 'water_leak', label: 'Water Leak' },
        { value: 'streetlight', label: 'Streetlight' },
        { value: 'drainage', label: 'Drainage' },
        { value: 'road_damage', label: 'Road Damage' },
        { value: 'other', label: 'Other' },
    ];

    const statuses = [
        { value: '', label: 'All Status' },
        { value: 'reported', label: 'Reported' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
    ];

    const sortOptions = [
        { value: '-createdAt', label: 'Newest First' },
        { value: 'createdAt', label: 'Oldest First' },
        { value: '-upvotesCount', label: 'Most Upvoted' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ [name]: value, page: 1 });
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            onFilterChange({ search: e.target.value, page: 1 });
        }
    };

    const activeFiltersCount = [
        params.category,
        params.status,
        params.search,
    ].filter(Boolean).length;

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400"
                    />
                    <input
                        type="text"
                        placeholder="Search issues..."
                        defaultValue={params.search}
                        onKeyDown={handleSearch}
                        className="input-field pl-10"
                    />
                </div>
                <Button
                    variant="secondary"
                    icon={SlidersHorizontal}
                    onClick={() => setShowFilters(!showFilters)}
                    className="relative"
                >
                    Filters
                    {activeFiltersCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>
            </div>

            {/* Filter Options */}
            {showFilters && (
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 animate-slide-down">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-dark-300 text-sm mb-2">
                                Category
                            </label>
                            <select
                                name="category"
                                value={params.category || ''}
                                onChange={handleChange}
                                className="select-field"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-dark-300 text-sm mb-2">Status</label>
                            <select
                                name="status"
                                value={params.status || ''}
                                onChange={handleChange}
                                className="select-field"
                            >
                                {statuses.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-dark-300 text-sm mb-2">
                                Sort By
                            </label>
                            <select
                                name="sort"
                                value={params.sort || '-createdAt'}
                                onChange={handleChange}
                                className="select-field"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Reset Button */}
                    {activeFiltersCount > 0 && (
                        <div className="mt-4 pt-4 border-t border-dark-700">
                            <Button
                                variant="ghost"
                                icon={X}
                                onClick={() => {
                                    onReset();
                                    setShowFilters(false);
                                }}
                                className="text-dark-400"
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default IssueFilters;
