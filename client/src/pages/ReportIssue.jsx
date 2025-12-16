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
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Report an Issue
                        </h1>
                        <p className="text-dark-400">
                            Help improve your community by reporting civic issues
                        </p>
                    </div>

                    {/* Tips */}
                    <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-4 mb-8">
                        <div className="flex gap-3">
                            <AlertTriangle size={20} className="text-primary-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-primary-300 font-medium mb-1">Tips for effective reporting:</p>
                                <ul className="text-primary-300/80 text-sm space-y-1">
                                    <li>• Be specific about the location and problem</li>
                                    <li>• Include clear photos of the issue</li>
                                    <li>• Allow location access for accurate GPS tagging</li>
                                    <li>• Provide any relevant context in the description</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 sm:p-8">
                        <IssueForm onSubmit={handleSubmit} loading={loading} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ReportIssue;
