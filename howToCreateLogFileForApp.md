Creating a **log file** for your **MERN stack application** is essential for debugging, monitoring errors, and tracking application events. Here’s how you can implement logging in both the **backend (Node.js + Express)** and **frontend (React)**.

---

## **1. Backend Logging (Node.js + Express.js)**

For backend logging, you can use **winston** and **morgan**, which are popular logging libraries.

### **Step 1: Install Dependencies**

```sh
npm install winston morgan fs path
```

### **Step 2: Create a Logger Utility**

Create a file `logger.js` inside a `utils` folder.

#### **logger.js**

```javascript
const winston = require("winston");
const path = require("path");
const fs = require("fs");

// Ensure logs directory exists
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create Winston Logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Log to file
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  ],
});

// If in development, also log to the console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
```

---

### **Step 3: Use Logger in Express Middleware**

Modify your `server.js` or `app.js` file:

#### **server.js**

```javascript
const express = require("express");
const logger = require("./utils/logger");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

// Morgan for HTTP request logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

// Example routes with logging
app.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.send("Welcome to MERN Stack Application");
});

app.get("/error", (req, res) => {
  logger.error("This is an error log example");
  res.status(500).send("Something went wrong!");
});

// Global error handler middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
```

---

## **2. Frontend Logging (React)**

For logging in React, you can use a similar approach with **winston-browser** or **custom log handlers**.

### **Step 1: Install Winston for Frontend**

```sh
npm install winston winston-transport-browserconsole
```

### **Step 2: Create a Logger Utility in React**

Create a file `logger.js` inside `src/utils/` folder.

#### **src/utils/logger.js**

```javascript
import winston from "winston";
import BrowserConsole from "winston-transport-browserconsole";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new BrowserConsole({ format: winston.format.simple() })],
});

export default logger;
```

---

### **Step 3: Use Logger in React Components**

Use it in your components like this:

#### **Example Usage in a Component**

```javascript
import React, { useEffect } from "react";
import logger from "../utils/logger";

const Dashboard = () => {
  useEffect(() => {
    logger.info("Dashboard component mounted");
  }, []);

  const handleClick = () => {
    logger.error("User clicked on a broken link");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default Dashboard;
```

---

## **3. Log Rotation (Optional)**

For large applications, log files can become too big. Use **winston-daily-rotate-file** for log rotation.

### **Install Dependency**

```sh
npm install winston-daily-rotate-file
```

### **Modify `logger.js`**

```javascript
const DailyRotateFile = require("winston-daily-rotate-file");

const transport = new DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [transport, new winston.transports.Console()],
});

module.exports = logger;
```

---

## **4. Viewing Logs**

- Logs will be stored in the **logs/** folder:
  - `logs/error.log` → Stores error logs
  - `logs/combined.log` → Stores all logs
  - `logs/access.log` → Stores HTTP request logs
- Use **tail -f logs/error.log** to view logs in real-time.

---

## **5. Deploy with Log Management**

For production, you can use **log monitoring tools** like:

- **Winston with Cloud Logging** (AWS CloudWatch, Google Cloud Logging)
- **Logstash + Kibana** for advanced log analysis
- **Papertrail or Datadog** for cloud log management

---

## **Final Thoughts**

Logging is crucial for maintaining **debugging efficiency, tracking errors, and monitoring API requests**. By implementing **winston and morgan**, you ensure that your **MERN stack application** has proper logging for both backend and frontend.

Would you like help integrating logs with a cloud service like AWS CloudWatch or Papertrail? 🚀
