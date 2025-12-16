import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, MapPin, Loader2 } from 'lucide-react';
import Button from '../common/Button';
import { useGeolocation } from '../../hooks/useGeolocation';
import toast from 'react-hot-toast';

/**
 * Issue Form Component
 * Form for creating/editing issues with image upload and GPS
 */
const IssueForm = ({ onSubmit, initialData = null, loading = false }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        category: initialData?.category || '',
        address: initialData?.location?.address || '',
        coordinates: initialData?.location?.coordinates || null,
    });
    const [images, setImages] = useState([]);
    const [existingImages] = useState(initialData?.images || []);

    const { position, loading: gpsLoading, getLocation } = useGeolocation();

    // Update coordinates when GPS position changes
    const handleGetLocation = () => {
        getLocation();
    };

    // Apply GPS coordinates to form
    const applyGpsLocation = () => {
        if (position) {
            setFormData((prev) => ({
                ...prev,
                coordinates: [position.lng, position.lat],
            }));
            toast.success('Location captured successfully');
        }
    };

    // Image dropzone
    const onDrop = useCallback(
        (acceptedFiles) => {
            const totalImages = images.length + existingImages.length;
            const remainingSlots = 5 - totalImages;

            if (remainingSlots <= 0) {
                toast.error('Maximum 5 images allowed');
                return;
            }

            const newFiles = acceptedFiles.slice(0, remainingSlots).map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );

            setImages((prev) => [...prev, ...newFiles]);
        },
        [images, existingImages]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
        },
        maxSize: 5 * 1024 * 1024, // 5MB
    });

    const removeImage = (index) => {
        setImages((prev) => {
            const newImages = [...prev];
            URL.revokeObjectURL(newImages[index].preview);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error('Please enter a title');
            return;
        }
        if (!formData.description.trim()) {
            toast.error('Please enter a description');
            return;
        }
        if (!formData.category) {
            toast.error('Please select a category');
            return;
        }
        if (!formData.coordinates) {
            toast.error('Please capture your location');
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append(
            'location',
            JSON.stringify({
                type: 'Point',
                coordinates: formData.coordinates,
                address: formData.address,
            })
        );

        images.forEach((image) => {
            data.append('images', image);
        });

        onSubmit(data);
    };

    const categories = [
        { value: 'pothole', label: 'Pothole' },
        { value: 'garbage', label: 'Garbage' },
        { value: 'water_leak', label: 'Water Leak' },
        { value: 'streetlight', label: 'Streetlight' },
        { value: 'drainage', label: 'Drainage' },
        { value: 'road_damage', label: 'Road Damage' },
        { value: 'other', label: 'Other' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label className="block text-dark-200 text-sm font-medium mb-2">
                    Issue Title *
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Large pothole on Main Street"
                    className="input-field"
                    maxLength={100}
                />
                <p className="text-dark-500 text-xs mt-1">
                    {formData.title.length}/100 characters
                </p>
            </div>

            {/* Category */}
            <div>
                <label className="block text-dark-200 text-sm font-medium mb-2">
                    Category *
                </label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select-field"
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="block text-dark-200 text-sm font-medium mb-2">
                    Description *
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide details about the issue..."
                    className="input-field min-h-[120px] resize-y"
                    maxLength={2000}
                />
                <p className="text-dark-500 text-xs mt-1">
                    {formData.description.length}/2000 characters
                </p>
            </div>

            {/* Location */}
            <div>
                <label className="block text-dark-200 text-sm font-medium mb-2">
                    Location *
                </label>
                <div className="space-y-3">
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            icon={gpsLoading ? Loader2 : MapPin}
                            onClick={handleGetLocation}
                            disabled={gpsLoading}
                            className={gpsLoading ? 'animate-pulse' : ''}
                        >
                            {gpsLoading ? 'Getting Location...' : 'Get My Location'}
                        </Button>
                        {position && !formData.coordinates && (
                            <Button
                                type="button"
                                variant="primary"
                                onClick={applyGpsLocation}
                            >
                                Use This Location
                            </Button>
                        )}
                    </div>

                    {formData.coordinates && (
                        <div className="flex items-center gap-2 text-sm text-emerald-400">
                            <MapPin size={16} />
                            <span>
                                Location captured: {formData.coordinates[1].toFixed(6)},{' '}
                                {formData.coordinates[0].toFixed(6)}
                            </span>
                        </div>
                    )}

                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address or landmark (optional)"
                        className="input-field"
                    />
                </div>
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-dark-200 text-sm font-medium mb-2">
                    Photos (Max 5)
                </label>

                {/* Dropzone */}
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${isDragActive
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-dark-600 hover:border-primary-500 hover:bg-dark-700/50'
                        }`}
                >
                    <input {...getInputProps()} />
                    <Upload
                        size={40}
                        className={`mx-auto mb-3 ${isDragActive ? 'text-primary-400' : 'text-dark-400'
                            }`}
                    />
                    <p className="text-dark-300">
                        {isDragActive
                            ? 'Drop the images here...'
                            : 'Drag & drop images here, or click to select'}
                    </p>
                    <p className="text-dark-500 text-sm mt-1">
                        JPG, PNG, WebP up to 5MB each
                    </p>
                </div>

                {/* Image Previews */}
                {(images.length > 0 || existingImages.length > 0) && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                        {/* Existing Images */}
                        {existingImages.map((url, index) => (
                            <div key={`existing-${index}`} className="relative group">
                                <img
                                    src={url}
                                    alt={`Existing ${index + 1}`}
                                    className="w-full h-20 object-cover rounded-lg"
                                />
                            </div>
                        ))}

                        {/* New Images */}
                        {images.map((file, index) => (
                            <div key={file.name} className="relative group">
                                <img
                                    src={file.preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-20 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
            >
                {initialData ? 'Update Issue' : 'Report Issue'}
            </Button>
        </form>
    );
};

export default IssueForm;
