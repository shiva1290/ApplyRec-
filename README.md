# ApplyRec - Job Application Tracker

A full-stack web application to track and manage job applications. Built with React, Node.js, Express, and MySQL.

**Live Demo:** https://applyrec.vercel.app

## Preview

### Landing Page
Modern dark-themed landing page with feature showcase and call-to-action.

### Dashboard
Track all your applications with statistics, search, filter, and sort functionality.

### Kanban Board
Drag-and-drop interface to move applications between status columns.

## Features

| Feature | Description |
|---------|-------------|
| User Authentication | Secure signup/login with JWT tokens and bcrypt password hashing |
| Application CRUD | Create, read, update, delete job applications |
| Status Tracking | Track progress: Applied, OA, Interview, Rejected, Offer |
| Kanban Board | Drag-and-drop to change application status |
| Search | Find applications by company name |
| Filter | Filter applications by status |
| Sort | Sort by date or company name |
| Statistics | Visual dashboard showing application counts by status |
| Notes | Add notes to each application |
| Follow-up Flags | Mark applications requiring follow-up |
| Dark Theme | Modern, professional dark UI |

## Tech Stack

**Frontend**
- React.js (Functional Components, Hooks)
- React Router DOM
- CSS Modules
- HTML5 Drag and Drop API

**Backend**
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt Password Hashing

**Deployment**
- Frontend: Vercel
- Backend: Railway
- Database: Railway MySQL

## Architecture

```
Frontend (React)          Backend (Express)         Database (MySQL)
     |                          |                        |
     |    REST API Calls        |     SQL Queries        |
     | -----------------------> | ---------------------> |
     | <----------------------- | <--------------------- |
     |    JSON Responses        |     Query Results      |
```

### Project Structure

```
ApplyRec/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # JWT authentication
│   ├── models/          # Database queries
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   └── server.js
└── frontend/
    └── src/
        ├── components/  # Reusable UI components
        ├── pages/       # Page components
        ├── services/    # API client
        └── styles/      # Global CSS
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register new user |
| POST | /api/auth/login | Authenticate user |
| GET | /api/applications | Get user's applications |
| POST | /api/applications | Create new application |
| PUT | /api/applications/:id | Update application |
| PATCH | /api/applications/:id/status | Update status (drag-drop) |
| DELETE | /api/applications/:id | Delete application |

## Key Implementation Highlights

**Authentication Flow**
- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiry
- Protected routes with middleware
- Secure token storage in localStorage

**Database Design**
- Normalized schema (3NF)
- Foreign key relationships
- ENUM for status validation
- Indexed queries for performance

**Frontend Architecture**
- Functional components with hooks
- Separation of UI and API logic
- CSS Modules for scoped styling
- Responsive design

**Drag and Drop**
- Native HTML5 Drag and Drop API
- No external libraries
- Real-time status updates via API

## Live Demo

**URL:** https://applyrec.vercel.app

**Test Account:**
- Email: test@applyrec.com
- Password: test123

Or create your own account to try all features.

