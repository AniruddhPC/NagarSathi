import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, Filter } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import MapView from '../components/map/MapView';
import Button from '../components/common/Button';

/**
 * Map Page Component
 * Full-screen map view of all issues
 */
const MapPage = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({});
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value || undefined,
        }));
    };

    const handleIssueClick = (issue) => {
        navigate(`/issues/${issue._id}`);
    };

    return (
        <div className="h-screen flex flex-col bg-dark-900">
            <Navbar />

            {/* Map Controls */}
            <div className="bg-dark-800 border-b border-dark-700 px-4 py-3">
                <div className="container-custom flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/">
                            <Button variant="secondary" size="sm" icon={List}>
                                List View
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            icon={Filter}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            Filters
                        </Button>
                    </div>
                    <div className="text-dark-400 text-sm">
                        Click on markers to view issue details
                    </div>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="container-custom mt-3 flex flex-wrap gap-3 animate-slide-down">
                        <select
                            name="category"
                            value={filters.category || ''}
                            onChange={handleFilterChange}
                            className="select-field w-auto"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                        <select
                            name="status"
                            value={filters.status || ''}
                            onChange={handleFilterChange}
                            className="select-field w-auto"
                        >
                            {statuses.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Map */}
            <div className="flex-1">
                <MapView
                    filters={filters}
                    onIssueClick={handleIssueClick}
                    height="100%"
                />
            </div>

            {/* Legend */}
            <div className="bg-dark-800 border-t border-dark-700 px-4 py-2">
                <div className="container-custom flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-dark-400">Reported</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <span className="text-dark-400">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-dark-400">Resolved</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
