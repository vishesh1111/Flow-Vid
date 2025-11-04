# 🎥 **FlowVid**
### Backend server for the *FlowVid* video-sharing web app 🎬  

---

## 🧠 **Project Overview**

**FlowVid** is the backend engine powering a full-stack video-sharing platform where users can **upload**, **watch**, **like**, and **comment** on videos.  
It handles **authentication**, **media storage**, and provides **RESTful APIs** for the front-end client.

Built using **Node.js** and **Express**, designed to integrate seamlessly with a **mobile-first responsive front end**.

---

## ✅ **Features**

✨ User registration & login (JWT-based authentication)  
📤 Upload & store video files and metadata  
🔍 Fetch and filter video lists by categories or keywords  
💬 Add comments and manage likes/dislikes  
👤 User profile management (upload history & favorites)  
🔒 Secure access controls for public and private videos  
📜 Well-structured REST API endpoints for easy integration  

---

## 🛠️ **Tech Stack**

| Layer | Technology |
|:------|:------------|
| **Server** | Node.js + Express |
| **Database** | MongoDB (Mongoose ORM) |
| **Media Storage** | Local filesystem / Cloud (e.g. AWS S3) |
| **Authentication** | JWT (JSON Web Token) |
| **Environment Config** | `.env` file for secrets & configuration |
| **Testing** | (Add Jest / Mocha / Supertest if used) |

---

## 📂 **Project Structure**


FlowVid-Backend/
│
├── src/
│ ├── controllers/ # Logic for API endpoints
│ ├── models/ # Data models / schemas
│ ├── routes/ # Route definitions
│ ├── middleware/ # Auth, error handling, file uploads
│
├── .env # Environment config (not committed)
├── package.json # Dependencies and scripts
└── server.js # Main entry point



2️⃣ Install Dependencies
npm install

3️⃣ Create Environment File

Create a .env file in the project root with your own configuration:

PORT=3000
DB_URI=<your-database-connection-string>
JWT_SECRET=<your-secret>
STORAGE_PATH=<path-for-videos>

4️⃣ Run the Server
npm start


The backend will be live at:
👉 http://localhost:<PORT>/api/...

🔍 API Documentation
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user & receive token
GET	/api/videos	Fetch all videos (supports filters/search)
POST	/api/videos/upload	Upload a new video (authenticated)
POST	/api/videos/:id/comments	Add a comment to a video
POST	/api/videos/:id/like	Like or dislike a video
