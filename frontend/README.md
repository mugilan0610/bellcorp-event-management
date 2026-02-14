
# 🎪 EventHub - MERN Stack Event Management Application

A full-stack event management platform where users can discover, register, and manage events with real-time seat availability.

![EventHub Demo](https://via.placeholder.com/800x400.png?text=EventHub+Demo)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 👤 Authentication
- User registration with password encryption
- Secure login with JWT tokens
- Protected routes for authenticated users

### 📅 Event Management
- Browse all events with pagination
- View detailed event information
- Real-time seat availability tracking
- Register for events with one click
- Cancel event registration
- Past and upcoming events separation

### 🔍 Event Discovery
- Search events by name, description, or organizer
- Filter by category (Conference, Workshop, Seminar, Networking, Social, Other)
- Filter by location
- Filter by date (Today, Tomorrow, This Week, This Month)
- Responsive grid layout

### 📊 User Dashboard
- View all registered events
- Upcoming events summary
- Past event history
- Next event highlight
- Cancel registrations from dashboard

### 🎨 UI/UX Features
- Beautiful gradient designs
- Smooth animations and transitions
- Hover effects and glow effects
- Loading spinners
- Toast notifications
- Password strength indicator
- Responsive design for all devices
- Confirmation modals
- Real-time validation

## 🛠 Tech Stack

### Frontend
- **React.js** (v18+) - UI library
- **React Router DOM** (v6+) - Routing
- **Axios** - HTTP client
- **date-fns** - Date formatting
- **React Hot Toast** - Toast notifications
- **Context API** - State management
- **CSS-in-JS** - Inline styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
bellcorp-event-management/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seedEvents.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── EventCard.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── BookingConfirmation.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Events.js
│   │   │   ├── EventDetails.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   └── package.json
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/bellcorp-event-management.git
cd bellcorp-event-management
```

### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see environment variables section)
# Seed the database with sample events
npm run seed

# Start the backend server
npm run dev
```

### Step 3: Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (see environment variables section)
# Start the frontend development server
npm start
```

## 🔐 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/eventmanagement
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

**Frontend:**
```bash
cd frontend
npm start
```
App runs on `http://localhost:3000`

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Private |

### Event Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/events` | Get all events (with filters) | Public |
| GET | `/api/events/:id` | Get single event | Public |
| GET | `/api/events/categories` | Get all categories | Public |
| POST | `/api/events/:id/register` | Register for event | Private |
| DELETE | `/api/events/:id/register` | Cancel registration | Private |

### Dashboard Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/dashboard/registrations` | Get user registrations | Private |
| GET | `/api/dashboard/summary` | Get dashboard summary | Private |

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400.png?text=Home+Page)

### Events Page
![Events Page](https://via.placeholder.com/800x400.png?text=Events+Page)

### Event Details
![Event Details](https://via.placeholder.com/800x400.png?text=Event+Details)

### Dashboard
![Dashboard](https://via.placeholder.com/800x400.png?text=Dashboard)

### Login Page
![Login](https://via.placeholder.com/800x400.png?text=Login)

### Register Page
![Register](https://via.placeholder.com/800x400.png?text=Register)

## 🌐 Deployment

### Backend Deployment (Render)
1. Create a Render account
2. Connect your GitHub repository
3. Create a new Web Service
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

### Frontend Deployment (Vercel)
1. Create a Vercel account
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in frontend directory
4. Follow the prompts
5. Set environment variables
6. Deploy

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👏 Acknowledgments

- Create React App team
- Express.js team
- MongoDB team
- All contributors and supporters

## 📧 Contact

Project Link: [https://github.com/yourusername/bellcorp-event-management](https://github.com/yourusername/bellcorp-event-management)

---

## 📊 Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Event Schema
```javascript
{
  name: String,
  organizer: String,
  location: String,
  date: Date,
  description: String,
  capacity: Number,
  availableSeats: Number,
  category: String,
  image: String,
  createdAt: Date
}
```

### Registration Schema
```javascript
{
  user: ObjectId (ref: User),
  event: ObjectId (ref: Event),
  registeredAt: Date,
  status: String
}
```

## 🎯 Features Checklist

- [x] User Authentication (Register/Login)
- [x] Protected Routes
- [x] Browse Events with Pagination
- [x] Search Events
- [x] Filter by Category
- [x] Filter by Location
- [x] Filter by Date
- [x] Event Registration
- [x] Cancel Registration
- [x] User Dashboard
- [x] Upcoming Events
- [x] Past Events
- [x] Responsive Design
- [x] Real-time Seat Updates
- [x] Toast Notifications
- [x] Loading States
- [x] Password Strength Indicator
- [x] Form Validation
- [x] Beautiful UI Animations

## 🐛 Known Issues

- None at the moment. Please report if you find any!

## 🚀 Future Enhancements

- [ ] Email confirmation for registrations
- [ ] Payment integration for paid events
- [ ] Event creation for organizers
- [ ] Review and rating system
- [ ] Social media sharing
- [ ] Calendar integration
- [ ] Mobile app with React Native
- [ ] Real-time notifications

---

**Made with ❤️ by [MUGILAN]**
```
