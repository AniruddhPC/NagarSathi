import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import IssueForm from '../components/issues/IssueForm';
import { issueApi } from '../services/api';
import toast from 'react-hot-toast';

/**
 * Report Issue Page Component
 * Form for creating new issues
 */
const ReportIssue = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            const response = await issueApi.createIssue(formData);
            toast.success('Issue reported successfully!');
            navigate(`/issues/${response.data.data._id}`);
        } catch (error) {
            toast.error(error.message || 'Failed to report issue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <main className="container-custom py-8">
                {/* Header */}
                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Report an Issue
                    </h1>
                    <p className="text-dark-400">
                        Help improve your community by reporting civic issues
                    </p>
                </div>

                {/* Two-column layout: Form + Tips Aside */}
                <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Form Card - Main Content */}
                    <div className="flex-1 order-2 lg:order-1">
                        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 sm:p-8">
                            <IssueForm onSubmit={handleSubmit} loading={loading} />
                        </div>
                    </div>

                    {/* Tips - Aside on desktop, top on mobile */}
                    <aside className="w-full lg:w-72 flex-shrink-0 order-1 lg:order-2">
                        <div className="lg:sticky lg:top-24 bg-primary-500/10 border border-primary-500/30 rounded-xl p-4">
                            <div className="flex gap-3">
                                <AlertTriangle size={20} className="text-primary-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-primary-300 font-medium mb-2">Tips for effective reporting:</p>
                                    <ul className="text-primary-300/80 text-sm space-y-2">
                                        <li>• Be specific about the location and problem</li>
                                        <li>• Include clear photos of the issue</li>
                                        <li>• Allow location access for accurate GPS tagging</li>
                                        <li>• Provide any relevant context in the description</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ReportIssue;
