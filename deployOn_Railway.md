### 🚀 **Deploy MERN Stack App on Railway.com**

Railway is a great platform to deploy **MERN (MongoDB, Express, React, Node.js) stack applications**. Follow these steps to deploy your app successfully.

---

## **Step 1: Create a Railway Account & Project**

1. Go to [Railway.app](https://railway.app/) and **Sign Up/Login**.
2. Click on **New Project** → Select **Deploy from GitHub Repo**.
3. Connect your **GitHub account** and select your MERN repository.
4. Railway will detect and set up your project.

---

## **Step 2: Deploy the Backend (Node.js + Express + MongoDB)**

### **1️⃣ Add MongoDB Database on Railway**

1. **Go to "New" → "Database"**
2. Select **MongoDB**
3. Copy the **MongoDB Connection URL** (`MONGO_URI`)

### **2️⃣ Configure Backend (Node.js)**

#### **Update `server.js` or `index.js` to Use Railway's MongoDB**

Modify your **MongoDB connection** in your backend:

```js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "your_local_mongo_url";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.error("MongoDB Connection Failed ❌", err));
```

#### **3️⃣ Add `Procfile` for Railway (Important!)**

Create a **`Procfile`** in your backend folder:

```
web: node server.js
```

_(Replace `server.js` with your actual entry file, e.g., `index.js`.)_

#### **4️⃣ Set Environment Variables on Railway**

1. Go to **Project → Variables**
2. Add:
   - `PORT = 8080`
   - `MONGO_URI = Your MongoDB Connection URL`
   - `JWT_SECRET = your_secret_key`
   - `NODE_ENV = production`

#### **5️⃣ Deploy Backend**

1. Commit & Push changes to GitHub.
2. Railway will **automatically detect & deploy your backend** 🎉

---

## **Step 3: Deploy the Frontend (React)**

### **1️⃣ Update `package.json` for React**

Modify `package.json` in your React frontend:

```json
"homepage": "/",
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "postinstall": "npm install && npm run build"
}
```

### **2️⃣ Add `Procfile` for Frontend**

Create a `Procfile` in your React folder:

```
web: serve -s build
```

### **3️⃣ Install `serve` to Serve the React App**

```sh
npm install -g serve
```

### **4️⃣ Deploy Frontend on Railway**

1. **Create a new service** on Railway.
2. **Connect GitHub Repo** (Frontend Repository).
3. **Set Environment Variables** (Add API URL for backend):
   - `REACT_APP_API_URL = https://your-backend-url.railway.app`
4. **Deploy!** 🎉

---

## **Step 4: Setup CORS for Backend**

Modify `server.js` to allow frontend requests:

```js
import cors from "cors";
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
```

Set `FRONTEND_URL` in Railway Variables:

```
FRONTEND_URL = https://your-frontend-url.railway.app
```

---

## **Step 5: Finalize & Test Deployment**

✅ **Backend:** `https://your-backend-url.railway.app/api`  
✅ **Frontend:** `https://your-frontend-url.railway.app`

### **🎉 Congratulations! Your MERN Stack app is LIVE on Railway! 🚀**

Let me know if you need any help. 😊
