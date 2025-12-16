# NagarSathi - Civic Issue Reporting Platform

A production-ready social-media–style civic issue reporting system built with the MERN stack.

![NagarSathi](https://via.placeholder.com/1200x400/0f172a/3b82f6?text=NagarSathi+-+Civic+Issue+Reporting+Platform)

## 🎯 Overview

NagarSathi connects citizens with local authorities to report and resolve civic issues. Citizens can report local issues (potholes, garbage, water leaks, streetlight failures, etc.), view them on a map, engage via upvotes and comments, and track resolution progress.

## ✨ Features

### For Citizens (Users)
- 📝 **Report Issues** - Submit civic issues with photos and GPS location
- 🗺️ **Map View** - View all issues on an interactive map
- 👍 **Upvote & Comment** - Engage with community issues
- 📊 **Track Progress** - Monitor status from Reported → In Progress → Resolved
- 👤 **Profile Dashboard** - View your reported issues and activity

### For Administrators
- 📋 **Issue Management** - View, filter, and manage all issues
- ✏️ **Status Updates** - Update issue status with notes
- ✅ **Resolution Proof** - Upload photos to prove resolution
- 📈 **Analytics Dashboard** - View trends, hotspots, and statistics

## 🧱 Tech Stack

### Frontend
- React 18 (Vite)
- Tailwind CSS (Dark theme)
- Clerk React SDK (Authentication)
- React Router v6
- Axios
- Leaflet (Maps)
- React Dropzone (Image uploads)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Clerk Backend SDK
- Cloudinary (Image storage)
- Multer (File handling)

## 📁 Project Structure

```
nagarsathi/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context
│   │   └── utils/          # Utility functions
│   └── public/
│
├── server/                 # Express Backend
│   ├── config/             # Database & Cloudinary config
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth & error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── utils/              # Utilities
│
└── docs/                   # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Clerk account (https://clerk.com)
- Cloudinary account (https://cloudinary.com)

### Installation

1. **Clone the repository**
```bash
cd Buildathon-Project
```

2. **Setup Backend**
```bash
cd server
npm install
# Create .env file (see .env.example)
npm run dev
```

3. **Setup Frontend**
```bash
cd client
npm install
# Create .env file (see .env.example)
npm run dev
```

4. **Open in browser**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 📚 API Documentation

See [API_DOCS.md](./docs/API_DOCS.md) for complete API documentation.

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/issues` | Get all issues |
| POST | `/api/issues` | Create new issue |
| GET | `/api/issues/:id` | Get issue details |
| POST | `/api/issues/:id/upvote` | Toggle upvote |
| POST | `/api/issues/:id/comments` | Add comment |
| PUT | `/api/admin/issues/:id/status` | Update status (Admin) |
| GET | `/api/admin/analytics` | Get analytics (Admin) |

## 🎨 Theme

Dark theme with civic blue accents:
- Primary: `#3b82f6` (Blue 500)
- Background: `#0f172a` (Slate 900)
- Card: `#1e293b` (Slate 800)
- Status Colors: Red (Reported), Amber (In Progress), Green (Resolved)

## 📱 Screenshots

### Home Feed
Social-media style issue cards with upvotes and comments.

### Map View
Interactive Leaflet map with color-coded markers.

### Admin Dashboard
Issue management table with analytics widgets.

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Backend (Render/Railway)
1. Push to GitHub
2. Create new Web Service
3. Set environment variables
4. Deploy

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

---

Built with ❤️ for better communities
