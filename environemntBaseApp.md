Creating an **environment-based MERN stack application** allows you to manage different configurations for **production, development, and demo** environments. Here’s how you can achieve this setup.

---

## **1. Setting Up Environment Variables**

Environment variables help manage different configurations without modifying your code for each environment.

### **Step 1: Create `.env` Files for Different Environments**

In your **root directory**, create separate `.env` files:

- **.env.development** (For Development)
- **.env.production** (For Production)
- **.env.demo** (For Demo)

Each file should contain environment-specific values:

#### **Example `.env.development`**

```ini
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/dev_db
JWT_SECRET=dev_secret_key
FRONTEND_URL=http://localhost:5173
PAYMENT_KEY=dev_payment_key
```

#### **Example `.env.production`**

```ini
NODE_ENV=production
PORT=8080
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/prod_db
JWT_SECRET=prod_secret_key
FRONTEND_URL=https://yourapp.com
PAYMENT_KEY=prod_payment_key
```

#### **Example `.env.demo`**

```ini
NODE_ENV=demo
PORT=4000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/demo_db
JWT_SECRET=demo_secret_key
FRONTEND_URL=https://demo.yourapp.com
PAYMENT_KEY=demo_payment_key
```

---

## **2. Configuring Backend (Node.js + Express)**

### **Step 1: Install dotenv**

```sh
npm install dotenv
```

### **Step 2: Load Environment Variables**

Modify `server.js` or `app.js`:

```javascript
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${process.env.NODE_ENV} database`))
  .catch((err) => console.error("Database connection error:", err));

app.get("/", (req, res) => {
  res.send(`Welcome to ${process.env.NODE_ENV} environment`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
```

---

## **3. Configuring Frontend (React)**

React uses **Vite or Create React App (CRA)** for environment variables.

### **Step 1: Create `.env` Files for React**

Inside your React project (`frontend/`), create:

- `.env.development`
- `.env.production`
- `.env.demo`

#### **Example `.env.development`**

```ini
VITE_API_URL=http://localhost:5000
VITE_FRONTEND_URL=http://localhost:5173
VITE_PAYMENT_KEY=dev_payment_key
```

#### **Example `.env.production`**

```ini
VITE_API_URL=https://api.yourapp.com
VITE_FRONTEND_URL=https://yourapp.com
VITE_PAYMENT_KEY=prod_payment_key
```

#### **Example `.env.demo`**

```ini
VITE_API_URL=https://api.demo.yourapp.com
VITE_FRONTEND_URL=https://demo.yourapp.com
VITE_PAYMENT_KEY=demo_payment_key
```

---

### **Step 2: Load Environment Variables in React**

Modify `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
});
```

Use the variables in React components:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);
```

---

## **4. Running Your App in Different Environments**

Modify your `package.json`:

```json
"scripts": {
  "start:dev": "NODE_ENV=development node server.js",
  "start:prod": "NODE_ENV=production node server.js",
  "start:demo": "NODE_ENV=demo node server.js",
  "client:dev": "vite --mode development",
  "client:prod": "vite --mode production",
  "client:demo": "vite --mode demo"
}
```

Run different environments:

```sh
# Backend
npm run start:dev
npm run start:prod
npm run start:demo

# Frontend
npm run client:dev
npm run client:prod
npm run client:demo
```

---

## **5. Deploying Different Environments**

### **For Backend**

Use different `.env` files for deployment.

For **Railway, Render, or AWS**, set **Environment Variables** in the dashboard.

For **Docker**, use:

```sh
docker run -e NODE_ENV=production -e MONGO_URI=mongodb+srv://... your-app
```

### **For Frontend**

Use Vite’s build system:

```sh
npm run build --mode production
npm run build --mode demo
```

Deploy with **Vercel, Netlify, or Firebase** based on the environment.

---

## **Final Thoughts**

- Using **dotenv** helps manage environment-specific configurations.
- **Different `.env` files** ensure smooth transitions between **development, production, and demo**.
- **Using `NODE_ENV`** ensures your application loads the correct configuration dynamically.

Let me know if you need help with deployment! 🚀
