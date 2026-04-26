# 🔐 OAuth Notes App

A simple full-stack app to learn OAuth authentication (Google & GitHub) with secure notes management.

---

## 🚀 Project Goal

Understand how OAuth works by building a real application where users can:

- Login using Google / GitHub
- Create, read, update, delete notes
- Stay authenticated using sessions/JWT

---

## 🧠 Core Flow (How it works)

1. User clicks Login  
2. Redirected to Google/GitHub  
3. Provider sends back authorization code  
4. Backend exchanges code → access token  
5. Fetch user profile  
6. Store user in database  
7. Create session / JWT  
8. Redirect to dashboard  
9. User manages notes  

---

## 🛠️ Tech Stack

- Backend: Node.js, Express  
- Database: MongoDB  
- Auth: OAuth (Google, GitHub)  
- Session/Auth: JWT / Express Session  

---

## 📁 Project Structure

project/
│
├── config/        
├── controllers/   
├── routes/        
├── models/        
├── middleware/    
├── utils/         
│
├── .env           
├── .gitignore     
├── package.json   
└── server.js      

---

## 🔑 Environment Variables (.env)

PORT=5000  
MONGO_URI=your_mongodb_url  

JWT_SECRET=your_secret  

GOOGLE_CLIENT_ID=your_id  
GOOGLE_CLIENT_SECRET=your_secret  

GITHUB_CLIENT_ID=your_id  
GITHUB_CLIENT_SECRET=your_secret  

SESSION_SECRET=your_session_secret  

---

## ⚠️ Important Rules

- Never commit `.env`  
- Always commit `package-lock.json`  
- Ignore `node_modules`  

---

## ▶️ Run the Project

npm install  
npm run dev  

---

## 🧪 Learning Outcomes

- Understand OAuth flow deeply  
- Learn backend authentication  
- Work with real-world login systems  
- Handle secure sessions/tokens  

---

## 🏗️ Future Improvements

- Add frontend (React)  
- Add refresh tokens  
- Add role-based access  
- Deploy to cloud (Render / AWS)  

---

## 👨‍💻 Author

Ramesh (Learning by building 🚀)


phase 4