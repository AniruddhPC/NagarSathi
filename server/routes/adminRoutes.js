import express from 'express';
import {
    getAllIssues,
    updateIssueStatus,
    resolveIssue,
    getAnalytics,
    getAllUsers,
    updateUserRole,
} from '../controllers/adminController.js';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/roleCheck.js';
import { uploadResolutionImages } from '../config/cloudinary.js';

const router = express.Router();

/**
 * Admin Routes
 * Base path: /api/admin
 * All routes require authentication and admin role
 */

// Apply auth and admin middleware to all routes
router.use(requireAuth);
router.use(requireAdmin);

// Issue management
router.get('/issues', getAllIssues);
router.put('/issues/:id/status', updateIssueStatus);
router.post('/issues/:id/resolve', uploadResolutionImages, resolveIssue);

// Analytics
router.get('/analytics', getAnalytics);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

export default router;
