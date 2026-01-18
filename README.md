# ApplyRec - Job Application Tracker

A full-stack web application to track and manage job applications throughout your placement journey.

**Live Demo:** [https://applyrec.vercel.app](https://applyrec.vercel.app)

**Backend API:** [https://applyrec-production.up.railway.app](https://applyrec-production.up.railway.app)

## Features

- **User Authentication** - Secure signup/login with JWT tokens
- **Application Tracking** - Add, edit, delete job applications
- **Status Management** - Track applications through stages (Applied, OA, Interview, Rejected, Offer)
- **Kanban Board** - Drag-and-drop interface to update application status
- **Search & Filter** - Find applications by company name or filter by status
- **Statistics Dashboard** - Visual overview of your application progress
- **Notes & Follow-ups** - Add notes and mark applications for follow-up
- **Dark Theme** - Modern, eye-friendly dark interface

## Tech Stack

### Frontend
- React.js (Functional Components)
- React Router DOM
- CSS Modules
- HTML5 Drag and Drop API

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt Password Hashing

## Project Structure

```
ApplyRec/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth middleware
│   ├── models/          # Database queries
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       ├── services/    # API calls
│       └── styles/      # Global styles
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MySQL (v8+)
- npm or yarn

### Database Setup

1. Start MySQL server
2. Run the schema file:
```bash
mysql -u root -p < backend/database/schema.sql
```

3. Run migrations:
```bash
mysql -u root -p < backend/database/migrations/add_notes_followup.sql
```

### Backend Setup

1. Navigate to backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=applyrec
JWT_SECRET=your_jwt_secret_key
```

4. Generate JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

5. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

4. Open http://localhost:3000

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |

### Applications (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications` | Get all applications |
| GET | `/api/applications?status=Applied` | Filter by status |
| POST | `/api/applications` | Create application |
| PUT | `/api/applications/:id` | Update application |
| PATCH | `/api/applications/:id/status` | Update status only |
| DELETE | `/api/applications/:id` | Delete application |

## Screenshots

### Landing Page
Dark themed landing page with feature showcase

### Dashboard
Grid view with statistics and application cards

### Kanban Board
Drag-and-drop board for status management

## Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| DB_HOST | MySQL host |
| DB_USER | MySQL username |
| DB_PASSWORD | MySQL password |
| DB_NAME | Database name |
| JWT_SECRET | Secret key for JWT |

### Frontend
| Variable | Description |
|----------|-------------|
| REACT_APP_API_URL | Backend API URL |

## Deployment

### Live URLs
| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://applyrec.vercel.app |
| Backend | Railway | https://applyrec-production.up.railway.app |
| Database | Railway MySQL | Internal |

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL`
4. Deploy

### Backend (Railway)
1. Connect GitHub repository to Railway
2. Set root directory to `backend`
3. Add MySQL database
4. Set environment variables (MYSQLHOST, MYSQLUSER, etc.)
5. Deploy

## Author

**Shiva Gupta**
- GitHub: [@shiva1290](https://github.com/shiva1290)

## License

This project is open source and available under the MIT License.
