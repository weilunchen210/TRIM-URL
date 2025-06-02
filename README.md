# 🔗 Trim URL - URL Shortener

A full-stack URL shortener application that allows users to create, manage, and track shortened URLs with comprehensive analytics. Created using the MERN tech stack

## 🌟 Features

### Core Functionality
- ✂️ **URL Shortening**: Convert long URLs into short, manageable links
- 📊 **Click Tracking**: Monitor clicks on your shortened URLs
- 👤 **User Authentication**: Secure login and registration system
- 🎯 **Personal Dashboard**: Manage all your URLs in one place
- 🎨 **Interactive Charts**: Visual representation of your URL performance
- 🔐 **Secure Authentication**: JWT-based authentication system

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe server development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trim-url.git
   cd trim-url
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URL=
   JWT_SECRET=
   JWT_EXPIRES_IN=
   ```

   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=
   ```

5. **Start MongoDB**
   Make sure your MongoDB service is running if you're running it locally

6. **Run the application**
   
   Backend (from root directory):
   ```bash
   npm run dev
   ```
   
   Frontend (from frontend directory):
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📖 API Documentation

### Authentication Endpoints
```
POST /user/register - Register a new user
POST /user/login    - Login user
PUT  /user/edit     - Update user profile (requires auth)
```

### URL Management Endpoints
```
GET    /url           - Get all user URLs (requires auth)
POST   /url           - Create shortened URL (requires auth)
PUT    /url/:id       - Update URL (requires auth)
DELETE /url/:id       - Delete URL (requires auth)
GET    /url/:shortUrl - Redirect to original URL (public)
```

### Analytics Endpoints
```
GET /statistics - Get user analytics (requires auth)
```

## 🎨 Screenshots

![image](https://github.com/user-attachments/assets/983b3198-3bb8-4be2-bd37-3d811aaf952c)

![image](https://github.com/user-attachments/assets/11cf2a36-0558-4aa2-a7c4-6dfc872da606)

![image](https://github.com/user-attachments/assets/69b2f6f4-41ed-4977-823c-b40982f768e4)

![image](https://github.com/user-attachments/assets/90576069-df13-4197-a2de-042ac123af7e)


## 📄 License

This project is licensed under the MIT License 

## 🙏 Acknowledgments

- [Icons8](https://icons8.com) 


