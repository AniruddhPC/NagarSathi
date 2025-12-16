import Issue from '../models/Issue.js';
import Comment from '../models/Comment.js';
import Upvote from '../models/Upvote.js';
import { asyncHandler, ApiError } from '../middleware/errorHandler.js';
import APIFeatures from '../utils/apiFeatures.js';

/**
 * Issue Controller
 * Handles all issue-related operations
 */

// @desc    Create a new issue
// @route   POST /api/issues
// @access  Private (User)
export const createIssue = asyncHandler(async (req, res) => {
    const { title, description, category, location } = req.body;

    // Get image URLs from uploaded files
    const images = req.files ? req.files.map((file) => file.path) : [];

    // Parse location if it's a string
    let parsedLocation = location;
    if (typeof location === 'string') {
        parsedLocation = JSON.parse(location);
    }

    const issue = await Issue.create({
        title,
        description,
        category,
        images,
        location: parsedLocation,
        createdBy: req.user._id,
        statusTimeline: [
            {
                status: 'reported',
                updatedAt: new Date(),
                updatedBy: req.user._id,
                note: 'Issue reported',
            },
        ],
    });

    // Populate creator info
    await issue.populate('createdBy', 'name avatar');

    res.status(201).json({
        success: true,
        message: 'Issue reported successfully',
        data: issue,
    });
});

// @desc    Get all issues with filtering and pagination
// @route   GET /api/issues
// @access  Public
export const getIssues = asyncHandler(async (req, res) => {
    // Count total documents matching the filter
    const countQuery = Issue.find();
    const countFeatures = new APIFeatures(countQuery, req.query)
        .filter()
        .search()
        .nearLocation();
    const total = await Issue.countDocuments(countFeatures.query.getFilter());

    // Get paginated results
    const features = new APIFeatures(Issue.find(), req.query)
        .filter()
        .search()
        .nearLocation()
        .sort()
        .paginate();

    const issues = await features.query
        .populate('createdBy', 'name avatar')
        .lean();

    res.status(200).json({
        success: true,
        count: issues.length,
        total,
        page: features.page,
        pages: Math.ceil(total / features.limit),
        data: issues,
    });
});

// @desc    Get single issue by ID
// @route   GET /api/issues/:id
// @access  Public
export const getIssueById = asyncHandler(async (req, res) => {
    const issue = await Issue.findById(req.params.id)
        .populate('createdBy', 'name avatar')
        .populate('statusTimeline.updatedBy', 'name')
        .populate('resolutionProof.resolvedBy', 'name');

    if (!issue) {
        throw new ApiError(404, 'Issue not found');
    }

    res.status(200).json({
        success: true,
        data: issue,
    });
});

// @desc    Update own issue
// @route   PUT /api/issues/:id
// @access  Private (Owner only)
export const updateIssue = asyncHandler(async (req, res) => {
    let issue = await Issue.findById(req.params.id);

    if (!issue) {
        throw new ApiError(404, 'Issue not found');
    }

    // Check ownership
    if (issue.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'You can only update your own issues');
    }

    // Only allow updating certain fields
    const { title, description, category } = req.body;
    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (category) updateFields.category = category;

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => file.path);
        updateFields.images = [...issue.images, ...newImages].slice(0, 5); // Max 5 images
    }

    issue = await Issue.findByIdAndUpdate(
        req.params.id,
        updateFields,
        { new: true, runValidators: true }
    ).populate('createdBy', 'name avatar');

    res.status(200).json({
        success: true,
        message: 'Issue updated successfully',
        data: issue,
    });
});

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private (Owner or Admin)
export const deleteIssue = asyncHandler(async (req, res) => {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
        throw new ApiError(404, 'Issue not found');
    }

    // Check ownership or admin
    const isOwner = issue.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
        throw new ApiError(403, 'Not authorized to delete this issue');
    }

    // Delete associated comments and upvotes
    await Comment.deleteMany({ issue: req.params.id });
    await Upvote.deleteMany({ issue: req.params.id });

    // Delete the issue
    await Issue.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Issue deleted successfully',
    });
});

// @desc    Get issues by current user
// @route   GET /api/issues/my-issues
// @access  Private
export const getMyIssues = asyncHandler(async (req, res) => {
    const features = new APIFeatures(
        Issue.find({ createdBy: req.user._id }),
        req.query
    )
        .filter()
        .sort()
        .paginate();

    const issues = await features.query.lean();

    const total = await Issue.countDocuments({ createdBy: req.user._id });

    res.status(200).json({
        success: true,
        count: issues.length,
        total,
        page: features.page,
        pages: Math.ceil(total / features.limit),
        data: issues,
    });
});

// @desc    Get issues for map view (minimal data)
// @route   GET /api/issues/map
// @access  Public
export const getIssuesForMap = asyncHandler(async (req, res) => {
    const features = new APIFeatures(Issue.find(), req.query)
        .filter()
        .nearLocation();

    const issues = await features.query
        .select('title category status location upvotesCount createdAt')
        .limit(500) // Limit for performance
        .lean();

    res.status(200).json({
        success: true,
        count: issues.length,
        data: issues,
    });
});
