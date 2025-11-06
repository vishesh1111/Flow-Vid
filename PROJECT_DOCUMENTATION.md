# YouTube Clone - Full Stack Application

A full-stack YouTube clone built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, modern UI design, and video management capabilities.

## 🚀 Features

### Backend
- **User Authentication**: JWT-based authentication with access and refresh tokens
- **User Registration & Login**: Secure password hashing with bcrypt
- **File Upload**: Multer integration for avatar and cover image uploads
- **Cloud Storage**: Cloudinary integration for media storage
- **RESTful API**: Clean and organized API endpoints
- **MongoDB Database**: Mongoose ODM for data modeling
- **CORS Enabled**: Cross-origin resource sharing for frontend integration

### Frontend
- **Modern UI**: YouTube-inspired design with Tailwind CSS
- **Responsive Design**: Mobile-first responsive layout
- **React Router**: Client-side routing for seamless navigation
- **Authentication Flow**: Login, Register, and Logout functionality
- **Video Grid**: Dynamic video card layout
- **Search Bar**: YouTube-style search interface
- **User Profile**: Avatar display and user menu

## 📁 Project Structure

```
BackendProject/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── user.controller.js
│   │   ├── db/
│   │   │   └── index.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── multer.middleware.js
│   │   ├── models/
│   │   │   ├── user.models.js
│   │   │   ├── video.models.js
│   │   │   └── subscription.models.js
│   │   ├── routes/
│   │   │   └── user.routes.js
│   │   ├── utils/
│   │   │   ├── ApiError.js
│   │   │   ├── ApiResponse.js
│   │   │   ├── asyncHandler.js
│   │   │   └── cloudinary.js
│   │   ├── app.js
│   │   ├── constants.js
│   │   └── index.js
│   ├── public/
│   │   └── temp/
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── VideoCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **Multer**: File upload middleware
- **Cloudinary**: Cloud media storage
- **dotenv**: Environment variable management

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS transformation

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=8000
CORS_ORIGIN=*
MONGODB_URL=mongodb://localhost:27017
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/users/register` | Register a new user | No |
| POST | `/api/v1/users/login` | Login user | No |
| POST | `/api/v1/users/logout` | Logout user | Yes |
| GET | `/api/v1/users/current-user` | Get current user | Yes |
| POST | `/api/v1/users/change-password` | Change password | Yes |

### Authentication

The API uses JWT tokens stored in HTTP-only cookies:
- **Access Token**: Short-lived token (1 day) for API requests
- **Refresh Token**: Long-lived token (10 days) for token renewal

## 🎨 UI Components

### Navbar
- YouTube-style navigation bar
- Search functionality
- User authentication status
- Avatar display for logged-in users
- Login/Logout buttons

### VideoCard
- Video thumbnail
- Video title and channel name
- View count and upload date
- Channel avatar

### Pages
- **Home**: Video grid with category filters
- **Login**: User authentication form
- **Register**: User registration form

## 🔐 Authentication Flow

1. **Register**: User creates an account with userName, email, fullName, and password
2. **Login**: User authenticates with email/userName and password
3. **Token Storage**: JWT tokens stored in localStorage
4. **Protected Routes**: Redirect unauthenticated users to login
5. **Logout**: Clear tokens and redirect to home

## 🚦 Running the Application

1. **Start MongoDB**:
```bash
brew services start mongodb-community
```

2. **Start Backend** (Terminal 1):
```bash
cd backend
npm run dev
```

3. **Start Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

4. **Access the Application**:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

## 📝 Usage

### Register a New User
1. Navigate to `http://localhost:5173/register`
2. Fill in: Full Name, Username, Email, Password
3. Click "Create Account"
4. Redirect to login page

### Login
1. Navigate to `http://localhost:5173/login`
2. Enter email/username and password
3. Click "Sign in"
4. Redirect to home page

### Browse Videos
1. Home page displays video grid
2. Use category filters to browse
3. Search functionality in navbar

## 🔧 Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 8000)
- `CORS_ORIGIN`: Allowed CORS origins
- `MONGODB_URL`: MongoDB connection string
- `ACCESS_TOKEN_SECRET`: Secret for access tokens
- `ACCESS_TOKEN_EXPIRY`: Access token expiration
- `REFRESH_TOKEN_SECRET`: Secret for refresh tokens
- `REFRESH_TOKEN_EXPIRY`: Refresh token expiration
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## 🎯 Future Enhancements

- [ ] Video upload functionality
- [ ] Video playback with player controls
- [ ] Comment system
- [ ] Like/Dislike functionality
- [ ] Subscription system
- [ ] User channel pages
- [ ] Video recommendations
- [ ] Search with filters
- [ ] Playlist creation
- [ ] Notifications
- [ ] Real-time updates with WebSockets
- [ ] Video analytics

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `brew services list`
- Check connection string in `.env`
- Verify database name: `VisheshYT`

### CORS Errors
- Verify `CORS_ORIGIN` in backend `.env`
- Check frontend is making requests to `http://localhost:8000`

### Tailwind CSS Not Working
- Ensure `@tailwindcss/postcss` is installed
- Verify `postcss.config.js` configuration
- Check `index.css` has Tailwind directives

### Authentication Errors
- Check JWT secrets are set in `.env`
- Verify tokens are being stored in localStorage
- Clear browser cache and localStorage

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Vishesh Verma

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!
