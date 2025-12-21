# 🏛️ NagarSathi - Civic Issue Reporting Platform

<div align="center">

![NagarSathi](https://via.placeholder.com/1200x400/0f172a/3b82f6?text=NagarSathi+-+Civic+Issue+Reporting+Platform)

A modern, production-ready civic issue reporting platform that connects citizens with local authorities to report and resolve community issues efficiently.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)](https://www.mongodb.com/mern-stack)
[![Clerk Auth](https://img.shields.io/badge/Auth-Clerk-purple)](https://clerk.com)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Authentication System](#-authentication-system)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**NagarSathi** (meaning "City Companion" in Hindi) is a comprehensive civic engagement platform that empowers citizens to report local infrastructure issues such as potholes, garbage accumulation, water leaks, streetlight failures, and more. The platform provides an interactive, social-media-style interface where users can:

- Report issues with photos and GPS location
- View all issues on an interactive map
- Engage with community through upvotes and comments
- Track resolution progress in real-time
- Analyze civic trends through an admin dashboard

---

## ✨ Features

### 👥 For Citizens (Users)

#### 📝 Issue Reporting
- **Rich Media Support**: Upload multiple images with automatic compression and optimization
- **GPS Location**: Automatic location detection or manual pin placement on map
- **Category Selection**: Choose from 10+ predefined issue categories (Roads, Water, Electricity, Garbage, etc.)
- **Detailed Descriptions**: Add comprehensive issue descriptions with markdown support

#### 🗺️ Interactive Map View
- **Leaflet Integration**: Fully interactive map powered by OpenStreetMap
- **Color-coded Markers**: Visual status indicators (Red: Reported, Amber: In Progress, Green: Resolved)
- **Real-time Updates**: Live marker updates as statuses change
- **Cluster Support**: Automatic marker clustering for better performance
- **Filter by Status**: Toggle visibility of different issue statuses

#### 💬 Social Engagement
- **Upvote System**: Vote on important issues to increase visibility
- **Comments & Discussion**: Engage in threaded discussions about issues
- **Real-time Notifications**: Get notified when issues are updated (via toast notifications)
- **Share Functionality**: Share issues on WhatsApp, Facebook, and Twitter

#### 👤 User Profile & Dashboard
- **Custom Profile Management**: Update name, profile picture, and personal information
- **Activity History**: View all your reported issues and comments
- **Account Settings**: 
  - Manage connected accounts (Google OAuth)
  - Active session management with remote sign-out
  - Password management with secure verification
  - Passkey (biometric) authentication support
  - Two-factor authentication (coming soon)
  - Account deletion with confirmation

#### 📊 Personal Analytics
- View your contribution statistics
- Track resolution rate of your reports
- See community impact metrics

### 🔧 For Administrators

#### 📋 Issue Management Dashboard
- **Comprehensive Table View**: Sortable, filterable table of all issues
- **Bulk Actions**: Update multiple issues simultaneously
- **Priority Assignment**: Mark critical issues for faster resolution
- **Advanced Filters**: Filter by status, category, date range, location, upvotes

#### ✏️ Status Management
- **Status Updates**: Change issue status (Reported → In Progress → Resolved)
- **Resolution Notes**: Add detailed notes about resolution process
- **Before/After Photos**: Upload proof of resolution with image comparison
- **Timeline Tracking**: Complete audit trail of all status changes

#### 📈 Analytics Dashboard
- **Issue Trends**: Visualize issue frequency over time using Recharts
- **Category Breakdown**: Pie charts showing distribution by category
- **Resolution Rate**: Track average resolution time and efficiency
- **Heatmap Analytics**: Identify problem hotspots in the city
- **Export Reports**: Download analytics data as CSV/PDF

---

## 🧱 Tech Stack

### Frontend Technologies

#### Core Framework & Build Tools
- **[React 18.2.0](https://react.dev/)** - Modern UI library with hooks and concurrent features
- **[Vite 5.0.8](https://vitejs.dev/)** - Lightning-fast development server and build tool
- **[React Router DOM 6.21.1](https://reactrouter.com/)** - Client-side routing with nested routes

#### Styling & UI
- **[Tailwind CSS 3.3.6](https://tailwindcss.com/)** - Utility-first CSS framework
  - Custom dark theme configuration
  - Extended color palette with civic-themed colors
  - Custom animations (dropdown, fade, slide)
  - Responsive design utilities
- **[Lucide React 0.294.0](https://lucide.dev/)** - Beautiful, customizable icon library (500+ icons)
- **Custom CSS** - Additional styling for Clerk components and animations

#### State Management & Data Fetching
- **[TanStack React Query 5.90.12](https://tanstack.com/query/)** - Powerful async state management
  - Automatic caching and background refetching
  - Optimistic updates
  - Infinite scroll pagination
  - Request deduplication
- **React Context API** - Global state for theme and user preferences

#### Authentication
- **[@clerk/clerk-react 5.0.0](https://clerk.com/docs)** - Complete authentication solution
  - OAuth providers (Google, GitHub)
  - Session management with JWT
  - User metadata sync via webhooks
  - Custom profile UI
  - Reverification for sensitive actions
  - Passkey (WebAuthn) support

#### Maps & Location
- **[Leaflet 1.9.4](https://leafletjs.com/)** - Interactive map library
- **[React Leaflet 4.2.1](https://react-leaflet.js.org/)** - React wrapper for Leaflet
  - Custom marker icons
  - Popup components
  - Geolocation API integration
  - Map bounds and viewport control

#### File Handling
- **[React Dropzone 14.2.3](https://react-dropzone.js.org/)** - Drag-and-drop file upload
  - Image validation
  - File type restrictions
  - Size limits
  - Preview generation

#### HTTP & API
- **[Axios 1.6.2](https://axios-http.com/)** - Promise-based HTTP client
  - Request/response interceptors
  - Automatic Clerk token attachment
  - Error handling middleware
  - Request cancellation

#### Notifications & Feedback
- **[React Hot Toast 2.4.1](https://react-hot-toast.com/)** - Elegant toast notifications
  - Custom styling
  - Loading states
  - Success/error variants
  - Auto-dismiss timers

#### Data Visualization
- **[Recharts 3.6.0](https://recharts.org/)** - Composable charting library
  - Line charts for trends
  - Pie charts for distribution
  - Bar charts for comparisons
  - Responsive charts

---

### Backend Technologies

#### Runtime & Framework
- **[Node.js 18+](https://nodejs.org/)** - JavaScript runtime
- **[Express.js 4.18.2](https://expressjs.com/)** - Minimal web framework
  - RESTful API design
  - Middleware architecture
  - Error handling
  - CORS configuration

#### Database
- **[MongoDB](https://www.mongodb.com/)** - NoSQL document database
  - Cloud-hosted on MongoDB Atlas
  - Geospatial indexing for location queries
  - Text indexing for search
  - Aggregation pipelines
- **[Mongoose 8.0.3](https://mongoosejs.com/)** - ODM (Object Data Modeling)
  - Schema validation
  - Pre/post hooks
  - Virtual properties
  - Population (joins)
  - Custom validators

#### Authentication & Security
- **[@clerk/express 1.0.0](https://clerk.com/docs/references/backend/overview)** - Clerk Express SDK
  - JWT verification middleware
  - User session validation
  - Webhook signature verification
- **[@clerk/backend 2.27.1](https://clerk.com/docs/references/backend/overview)** - Clerk Backend SDK
  - User management API
  - Metadata operations
  - Session management
- **[Svix 1.15.0](https://www.svix.com/)** - Webhook verification library
  - Signature validation
  - Timestamp verification
  - Replay attack prevention

#### File Storage & Media Processing
- **[Cloudinary 1.41.0](https://cloudinary.com/)** - Cloud-based media management
  - Image upload and storage
  - Automatic optimization
  - Responsive image delivery
  - Transformation API (resize, crop, format)
  - CDN distribution
- **[Multer 1.4.5-lts.1](https://github.com/expressjs/multer)** - Multipart form-data handler
  - File upload middleware
  - Memory storage buffer
  - File size validation
- **[Multer Storage Cloudinary 4.0.0](https://github.com/affanshahid/multer-storage-cloudinary)** - Cloudinary storage engine
  - Direct upload to Cloudinary
  - Custom file naming
  - Folder organization

#### Utilities
- **[CORS 2.8.5](https://github.com/expressjs/cors)** - Cross-origin resource sharing
  - Configurable origin whitelist
  - Credentials support
  - Preflight handling
- **[Dotenv 16.3.1](https://github.com/motdotla/dotenv)** - Environment variable management
  - `.env` file support
  - Development/production configs

---

### Development Tools

#### Frontend DevDependencies
- **[@vitejs/plugin-react 4.2.1](https://github.com/vitejs/vite-plugin-react)** - React Fast Refresh support
- **[ESLint 8.55.0](https://eslint.org/)** - JavaScript linter
  - React plugin
  - React Hooks plugin
  - Custom rules configuration
- **[PostCSS 8.4.32](https://postcss.org/)** - CSS transformations
- **[Autoprefixer 10.4.16](https://github.com/postcss/autoprefixer)** - Vendor prefix automation
- **TypeScript Types** - Type definitions for React and React DOM

#### Backend DevDependencies
- **[Nodemon 3.0.2](https://nodemon.io/)** - Auto-restart development server
  - File watching
  - Configurable ignore patterns
  - ES module support

---

## 🏗️ Project Architecture

### Directory Structure

```
nagarsathi/
│
├── client/                          # Frontend React Application
│   ├── public/                      # Static assets
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/              # Reusable UI Components
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── Navbar.jsx       # Navigation bar with custom user menu
│   │   │   │   ├── CustomUserMenu.jsx # Clerk user dropdown replacement
│   │   │   │   ├── Footer.jsx       # Footer component
│   │   │   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   │   │   └── PageNotFound.jsx # 404 component
│   │   │   │
│   │   │   ├── issues/              # Issue-related components
│   │   │   │   ├── IssueCard.jsx    # Issue display card
│   │   │   │   ├── IssueForm.jsx    # Issue creation/edit form
│   │   │   │   ├── IssueList.jsx    # List view of issues
│   │   │   │   ├── IssueFilters.jsx # Filter controls
│   │   │   │   ├── MapView.jsx      # Leaflet map component
│   │   │   │   ├── CommentSection.jsx # Comments UI
│   │   │   │   └── ShareModal.jsx   # Social sharing dialog
│   │   │   │
│   │   │   ├── admin/               # Admin-only components
│   │   │   │   ├── AdminDashboard.jsx # Overview dashboard
│   │   │   │   ├── IssueTable.jsx   # Data table with sorting
│   │   │   │   ├── AnalyticsCharts.jsx # Recharts visualizations
│   │   │   │   └── StatusUpdateModal.jsx # Status change dialog
│   │   │   │
│   │   │   └── layout/              # Layout components
│   │   │       ├── PageLayout.jsx   # Common page wrapper
│   │   │       └── Loader.jsx       # Loading spinner
│   │   │
│   │   ├── pages/                   # Page Components
│   │   │   ├── Home.jsx             # Landing/feed page
│   │   │   ├── ReportIssue.jsx      # Issue creation page
│   │   │   ├── IssueDetail.jsx      # Single issue view
│   │   │   ├── Profile.jsx          # User profile page
│   │   │   ├── AccountSettings.jsx  # Account settings page
│   │   │   ├── AdminPanel.jsx       # Admin dashboard
│   │   │   ├── SignInPage.jsx       # Clerk sign-in page
│   │   │   └── SignUpPage.jsx       # Clerk sign-up page
│   │   │
│   │   ├── hooks/                   # Custom React Hooks
│   │   │   ├── useAuth.js           # Clerk authentication hook
│   │   │   ├── useIssues.js         # React Query issues hook
│   │   │   ├── useGeolocation.js    # Browser geolocation hook
│   │   │   └── useDebounce.js       # Debounce utility hook
│   │   │
│   │   ├── services/                # API Service Layer
│   │   │   └── api.js               # Axios instance & API methods
│   │   │
│   │   ├── context/                 # React Context Providers
│   │   │   ├── ThemeContext.jsx     # Theme state management
│   │   │   └── AuthContext.jsx      # Auth state wrapper
│   │   │
│   │   ├── utils/                   # Utility Functions
│   │   │   ├── formatDate.js        # Date formatting helpers
│   │   │   └── constants.js         # App-wide constants
│   │   │
│   │   ├── lib/                     # External library configs
│   │   │   └── clerk.js             # Clerk configuration
│   │   │
│   │   ├── App.jsx                  # Main app component with routes
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles & Tailwind
│   │
│   ├── .env                         # Environment variables (git-ignored)
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── postcss.config.js            # PostCSS configuration
│   ├── eslint.config.js             # ESLint rules
│   └── package.json                 # Frontend dependencies
│
├── server/                          # Backend Express Application
│   ├── config/                      # Configuration Files
│   │   ├── db.js                    # MongoDB connection
│   │   └── cloudinary.js            # Cloudinary setup
│   │
│   ├── models/                      # Mongoose Models
│   │   ├── Issue.js                 # Issue schema
│   │   ├── User.js                  # User schema (Clerk sync)
│   │   ├── Comment.js               # Comment schema
│   │   ├── Upvote.js                # Upvote schema
│   │   └── Admin.js                 # Admin user schema
│   │
│   ├── controllers/                 # Route Controllers
│   │   ├── issueController.js       # Issue CRUD operations
│   │   ├── commentController.js     # Comment operations
│   │   ├── upvoteController.js      # Upvote logic
│   │   ├── adminController.js       # Admin-specific operations
│   │   ├── analyticsController.js   # Analytics & statistics
│   │   ├── userController.js        # User profile operations
│   │   └── webhookController.js     # Clerk webhook handlers
│   │
│   ├── routes/                      # Express Routes
│   │   ├── issues.js                # Issue endpoints
│   │   ├── comments.js              # Comment endpoints
│   │   ├── upvotes.js               # Upvote endpoints
│   │   ├── admin.js                 # Admin endpoints
│   │   ├── analytics.js             # Analytics endpoints
│   │   ├── users.js                 # User endpoints
│   │   ├── webhooks.js              # Webhook endpoints
│   │   └── index.js                 # Route aggregator
│   │
│   ├── middleware/                  # Express Middleware
│   │   ├── auth.js                  # Clerk JWT verification
│   │   ├── adminCheck.js            # Admin role verification
│   │   └── errorHandler.js          # Global error handler
│   │
│   ├── utils/                       # Utility Functions
│   │   └── logger.js                # Custom logging utility
│   │
│   ├── .env                         # Environment variables (git-ignored)
│   ├── server.js                    # Express app entry point
│   └── package.json                 # Backend dependencies
│
├── docs/                            # Documentation
│   ├── API_DOCS.md                  # API endpoint documentation
│   └── DEPLOYMENT.md                # Deployment guide
│
├── .gitignore                       # Git ignore rules
├── README.md                        # This file
└── LICENSE                          # MIT License
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **MongoDB** account ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Clerk** account ([Get Started](https://clerk.com))
- **Cloudinary** account ([Sign Up](https://cloudinary.com))
- **Git** ([Download](https://git-scm.com/))

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nagarsathi.git
cd nagarsathi
```

#### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your credentials (see Environment Variables section)
# Start development server
npm run dev
```

The backend server will start on `http://localhost:5000`

#### 3. Frontend Setup

```bash
# Navigate to client directory (open new terminal)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your credentials
# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

#### 4. Database Setup

1. Create a MongoDB Atlas cluster (free tier available)
2. Create a database user with read/write permissions
3. Whitelist your IP address
4. Copy the connection string to `MONGODB_URI` in server `.env`

#### 5. Clerk Setup

1. Create a new Clerk application
2. Enable Google OAuth provider (optional)
3. Enable Passkeys in the authentication settings
4. Copy publishable and secret keys to respective `.env` files
5. Set up webhook endpoint: `https://your-backend-url/api/webhooks/clerk`
6. Configure webhook events: `user.created`, `user.updated`, `user.deleted`

#### 6. Cloudinary Setup

1. Sign up for Cloudinary
2. Navigate to Dashboard
3. Copy Cloud Name, API Key, and API Secret to server `.env`
4. Create an upload preset (optional)

---

## 🔐 Environment Variables

### Backend (server/.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nagarsathi?retryWrites=true&w=majority

# Clerk Authentication
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxx

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173

# Admin Configuration (optional)
ADMIN_EMAIL=admin@example.com
```

### Frontend (client/.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx

# Map Configuration (optional)
VITE_MAP_DEFAULT_CENTER_LAT=28.6139
VITE_MAP_DEFAULT_CENTER_LNG=77.2090
VITE_MAP_DEFAULT_ZOOM=12
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected routes require a valid Clerk JWT token in the `Authorization` header:
```
Authorization: Bearer <clerk_jwt_token>
```

### Endpoints Overview

#### Issues API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/issues` | Public | Get all issues with optional filters |
| `GET` | `/issues/:id` | Public | Get single issue details |
| `POST` | `/issues` | Required | Create new issue |
| `PUT` | `/issues/:id` | Required (Owner) | Update issue |
| `DELETE` | `/issues/:id` | Required (Owner) | Delete issue |
| `POST` | `/issues/:id/upvote` | Required | Toggle upvote on issue |
| `GET` | `/issues/:id/comments` | Public | Get comments for issue |
| `POST` | `/issues/:id/comments` | Required | Add comment to issue |

#### Admin API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/admin/issues` | Admin | Get all issues (admin view) |
| `PUT` | `/admin/issues/:id/status` | Admin | Update issue status |
| `PUT` | `/admin/issues/:id/priority` | Admin | Set issue priority |
| `GET` | `/admin/analytics` | Admin | Get comprehensive analytics |
| `GET` | `/admin/users` | Admin | Get user statistics |

#### User API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/users/profile` | Required | Get current user profile |
| `PUT` | `/users/profile` | Required | Update user profile |
| `GET` | `/users/:id/issues` | Public | Get user's issues |
| `GET` | `/users/:id/activity` | Public | Get user activity |

#### Webhooks

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/webhooks/clerk` | Webhook Secret | Clerk user sync webhook |

### Sample Requests

#### Get All Issues (with filters)
```bash
GET /api/issues?status=reported&category=roads&limit=10&page=1
```

Response:
```json
{
  "success": true,
  "data": {
    "issues": [...],
    "pagination": {
      "total": 45,
      "page": 1,
      "pages": 5,
      "limit": 10
    }
  }
}
```

#### Create New Issue
```bash
POST /api/issues
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "title": "Pothole on Main Street",
  "description": "Large pothole causing traffic issues",
  "category": "roads",
  "location": {
    "type": "Point",
    "coordinates": [77.2090, 28.6139]
  },
  "address": "Main Street, Sector 15",
  "images": [<file1>, <file2>]
}
```

For complete API documentation, see [API_DOCS.md](./docs/API_DOCS.md)

---

## 🔒 Authentication System

### Clerk Integration

NagarSathi uses **Clerk** for a complete authentication solution with the following features:

#### Authentication Methods
- **Email & Password**: Traditional authentication with secure password hashing
- **Google OAuth**: One-click sign-in with Google accounts
- **Passkeys (WebAuthn)**: Biometric authentication support (Face ID, Touch ID, Windows Hello)
- **Magic Links**: Passwordless email authentication (optional)

#### Session Management
- **JWT Tokens**: Secure, stateless authentication
- **Session Persistence**: Automatic token refresh
- **Multi-device Sessions**: Track and manage sessions across devices
- **Remote Sign-out**: End sessions from other devices

#### Security Features
1. **Re-verification**: Sensitive actions require password re-entry
   - Password changes
   - Passkey creation
   - Account deletion
   
2. **Session Policies**:
   - Auto-logout after 30 days of inactivity
   - Force re-authentication for high-risk actions
   - Session revocation on password change

3. **Webhook Synchronization**:
   - Automatic user creation in MongoDB
   - Profile updates synced in real-time
   - User deletion cascades to related data

#### Custom UI Implementation
- Custom user dropdown menu (replaces Clerk `UserButton`)
- Custom account settings page with:
  - Profile management
  - Security settings
  - Active session viewer
  - Connected accounts display
  - Danger zone (account deletion)

#### Implementation Details
```javascript
// Custom auth hook
const { user, isLoaded, isSignedIn } = useUser();
const { signOut } = useClerk();
const { reverify } = useReverification();

// Protected route
<Route element={<ProtectedRoute />}>
  <Route path="/profile" element={<Profile />} />
</Route>

// Reverification for sensitive actions
await reverify(async () => {
  await user.updatePassword({
    currentPassword,
    newPassword
  });
});
```

---

## 🗄️ Database Schema

### Issue Model
```javascript
{
  title: String (required, 5-100 chars),
  description: String (required, 20-1000 chars),
  category: String (enum: roads, water, electricity, garbage, etc.),
  status: String (enum: reported, in-progress, resolved),
  images: [{ url, publicId }],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  },
  address: String,
  reportedBy: { type: ObjectId, ref: 'User' },
  upvotes: Number (default: 0),
  commentCount: Number (default: 0),
  priority: String (enum: low, medium, high),
  resolvedAt: Date,
  resolvedBy: { type: ObjectId, ref: 'User' },
  resolutionNotes: String,
  resolutionImages: [{ url, publicId }],
  createdAt: Date,
  updatedAt: Date
}
```

### User Model (Clerk Sync)
```javascript
{
  clerkId: String (unique, required),
  email: String (required),
  firstName: String,
  lastName: String,
  profileImage: String,
  role: String (enum: user, admin),
  isActive: Boolean (default: true),
  metadata: Object, // Additional Clerk metadata
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  content: String (required, 1-500 chars),
  author: { type: ObjectId, ref: 'User' },
  issue: { type: ObjectId, ref: 'Issue' },
  createdAt: Date,
  updatedAt: Date
}
```

### Upvote Model
```javascript
{
  user: { type: ObjectId, ref: 'User' },
  issue: { type: ObjectId, ref: 'Issue' },
  createdAt: Date
}
```

### Indexes
```javascript
// Geospatial index for location queries
Issue.index({ location: '2dsphere' });

// Text index for search
Issue.index({ title: 'text', description: 'text' });

// Compound index for filtering
Issue.index({ status: 1, category: 1, createdAt: -1 });
```

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-500: #3b82f6;  /* Main brand color */
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* Dark Theme */
--dark-900: #0f172a;  /* Background */
--dark-800: #1e293b;  /* Card background */
--dark-700: #334155;  /* Borders */
--dark-600: #475569;  /* Muted text */
--dark-400: #94a3b8;  /* Secondary text */
--dark-300: #cbd5e1;  /* Primary text */

/* Status Colors */
--status-reported: #ef4444;    /* Red */
--status-in-progress: #f59e0b; /* Amber */
--status-resolved: #10b981;    /* Green */
```

### Typography
- **Font Family**: System font stack (San Francisco, Segoe UI, Roboto)
- **Headings**: Bold, larger sizes with tracking
- **Body**: Regular, readable line-height (1.6)

### Components
- **Cards**: Rounded corners (12px), subtle shadows, hover effects
- **Buttons**: Primary (blue), Secondary (gray), Danger (red)
- **Forms**: Clean inputs with focus states, inline validation
- **Modals**: Backdrop blur, slide-in animations

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Prepare for deployment**
```bash
cd client
npm run build
```

2. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

3. **Configure Vercel**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Backend Deployment (Render)

1. **Create `render.yaml`**
```yaml
services:
  - type: web
    name: nagarsathi-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

2. **Deploy to Render**
- Connect GitHub repository
- Select `server` as root directory
- Add environment variables from dashboard

### MongoDB Atlas Configuration

1. **Production Database**
- Create dedicated cluster for production
- Enable backup and monitoring
- Configure IP whitelist (add deployment server IPs)

2. **Indexes**
```bash
# Run in MongoDB shell
db.issues.createIndex({ location: "2dsphere" })
db.issues.createIndex({ status: 1, createdAt: -1 })
```

### Post-Deployment Checklist

- [ ] Update Clerk webhook URL to production backend
- [ ] Configure CORS origins in backend
- [ ] Test OAuth flows in production
- [ ] Verify Cloudinary uploads work
- [ ] Run database migrations if needed
- [ ] Test all critical user flows
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Configure CDN caching rules
- [ ] Enable HTTPS/SSL
- [ ] Set up automated backups

---

## 🧪 Testing

### Run Tests (Coming Soon)
```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
npm test

# E2E tests
npm run test:e2e
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Update documentation for new features
- Test thoroughly before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors & Contributors

- **Your Name** - *Initial work* - [GitHub Profile](https://github.com/yourusername)

See also the list of [contributors](https://github.com/yourusername/nagarsathi/contributors) who participated in this project.

---

## 🙏 Acknowledgments

- Clerk team for amazing authentication platform
- Leaflet contributors for the mapping library
- MongoDB Atlas for database hosting
- Cloudinary for image management
- Tailwind CSS team for the utility framework
- React community for excellent ecosystem

---

## 📞 Support

For support, email support@nagarsathi.com or join our Slack channel.

---

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Basic issue reporting
- [x] Map visualization
- [x] Admin dashboard
- [x] Analytics

### Phase 2 (Q1 2025)
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Advanced search
- [ ] Export reports

### Phase 3 (Q2 2025)
- [ ] AI-powered issue categorization
- [ ] Sentiment analysis
- [ ] Municipality API integration
- [ ] Multi-language support

---

<div align="center">

**Built with ❤️ for better communities**

[Report Bug](https://github.com/yourusername/nagarsathi/issues) · [Request Feature](https://github.com/yourusername/nagarsathi/issues)

</div>
